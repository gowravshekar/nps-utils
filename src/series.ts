import { quoteScript } from "./utils/quoteScript";

/**
 * Accepts any number of scripts, filters out any
 * falsy ones and joins them with ' && '
 * @param scripts - Any number of strings representing commands
 * @example
 * // returns 'eslint && jest && webpack --env.production'
 * series('eslint', 'jest', 'webpack --env.production')
 * @return - the command that will execute the given scripts in series
 */
export function series(...scripts: string[]): string {
    return scripts.filter(Boolean).join(" && ");
}

/**
 * Accepts any number of nps script names, filters out
 * any falsy ones, prepends `nps` to them, and passes
 * the that to `series`
 * @param scriptNames - the script names to run
 * // returns 'nps lint && nps "test --coverage" && nps build'
 * series.nps('lint', 'test --coverage', 'build')
 * @return - the command that will execute the nps scripts in series
 */
export function seriesNPS(...scriptNames: string[]): string {
    return series(
        ...scriptNames
            .filter(Boolean)
            .map((scriptName) => scriptName.trim())
            .filter(Boolean)
            .map((scriptName) => `nps ${quoteScript(scriptName)}`),
    );
}
