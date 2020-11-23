import { runBin } from "./binary";
import { quoteScript } from "./utils/quoteScript";

const defaultColors = [
    "bgBlue.bold",
    "bgMagenta.bold",
    "bgGreen.bold",
    "bgBlack.bold",
    "bgCyan.bold",
    "bgRed.bold",
    "bgWhite.bold",
    "bgYellow.bold",
    // TODO: add more colors that look good?
];

/**
 * Escape a string so the shell expands it to the original.
 * @param - as accepted by any-shell-escape; arrays will
 * yield multiple arguments in the shell
 * @returns ready to pass to shell
 */
function shellEscape(arg: string | string[]): string {
    // lazily require for perf :)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require("any-shell-escape")(arg);
}

interface ConcurrentScript {
    script: string;
    color?: string;
}

/**
 * Generates a command that uses `concurrently` to run
 * scripts concurrently. Adds a few flags to make it
 * behave as you probably want (like --kill-others-on-fail).
 * In addition, it adds color and labels where the color
 * can be specified or is defaulted and the label is based
 * on the key for the script.
 * @param scripts - the scripts to run
 *   note: this function filters out falsy values :)
 * @example
 * // returns a bit of a long script that can vary slightly
 * // based on your environment... :)
 * concurrent({
 *   lint: {
 *     script: 'eslint .',
 *     color: 'bgGreen.white.dim',
 *   },
 *   test: 'jest',
 *   build: {
 *     script: 'webpack'
 *   }
 * })
 * @return - the command to run
 */
export function concurrent(scripts: Record<string, ConcurrentScript | string>): string {
    interface ConcurrentlyScripts {
        colors: string[];
        scripts: string[];
        names: string[];
    }

    const concurrentlyScripts: ConcurrentlyScripts = Object.keys(scripts).reduce(
        (previousValue, scriptName, currentIndex) => {
            let scriptObj = scripts[scriptName];

            if (!scriptObj) return previousValue;

            if (typeof scriptObj === "string") scriptObj = { script: scriptObj };

            const { script, color = defaultColors[currentIndex % defaultColors.length] } = scriptObj;

            if (!script) return previousValue;

            previousValue.names.push(scriptName);
            previousValue.colors.push(color);
            previousValue.scripts.push(script);

            return previousValue;
        },
        {
            colors: [],
            names: [],
            scripts: [],
        } as ConcurrentlyScripts,
    );

    const { colors, names, scripts: processedScripts } = concurrentlyScripts;

    const flags = [
        "--kill-others-on-fail",
        `--prefix-colors "${colors.join(",")}"`,
        '--prefix "[{name}]"',
        `--names "${names.join(",")}"`,
        shellEscape(processedScripts),
    ];

    const concurrently = runBin("concurrently");

    return `${concurrently} ${flags.join(" ")}`;
}

/**
 * Accepts any number of nps script names, filters out
 * any falsy ones, prepends `nps` to them, and passes
 * the that to `concurrent`
 * @param scriptNames - the script names to run
 * @example
 * // will basically return `nps lint & nps "test --coverage" & nps build`
 * // but with the concurrently command and relevant flags to make
 * // it super awesome with colors and whatnot. :)
 * concurrent.nps('lint', 'test --coverage', 'build')
 * @return the command to run
 */
export function concurrentNPS(...npsScripts: string[]): string {
    function reduceNPSScripts(
        previousVal: Record<string, ConcurrentScript>,
        currentVal: ConcurrentScript | undefined,
    ): Record<string, ConcurrentScript> {
        if (!currentVal) return previousVal;
        const { color, script } = currentVal;
        const [name] = script.split(" ");

        previousVal[name] = { script: `nps ${quoteScript(script.trim())}`, color };

        return previousVal;
    }

    function mapNPSScripts(script: string, index: number): ConcurrentScript | undefined {
        const color = defaultColors[index];

        if (!Boolean(script)) return undefined;

        if (typeof script === "string") return { script, color };

        return Object.assign({ color }, script);
    }

    return concurrent(npsScripts.map(mapNPSScripts).reduce(reduceNPSScripts, {} as Record<string, ConcurrentScript>));
}
