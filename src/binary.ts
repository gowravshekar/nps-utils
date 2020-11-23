import * as path from "path";

/**
 * Get the path to one of the bin scripts exported by a package
 * @param packageName - name of the npm package
 * @param binName - name of the script. Defaults to packageName
 * @returns path, relative to process.cwd()
 */
export function getBin(packageName: string, binName = packageName): string {
    const packagePath = require.resolve(`${packageName}/package.json`);
    const concurrentlyDir = path.dirname(packagePath);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let { bin: binRelativeToPackage } = require(packagePath);

    if (typeof binRelativeToPackage === "object") {
        binRelativeToPackage = binRelativeToPackage[binName];
    }

    const fullBinPath = path.join(concurrentlyDir, binRelativeToPackage);

    return path.relative(process.cwd(), fullBinPath);
}

/**
 * Get the path to one of the bin scripts exported by a package
 * @param packageName - name of the npm package
 * @param binName - name of the script. Defaults to packageName
 * @returns path, relative to process.cwd()
 */
export function runBin(packageName: string, binName = packageName): string {
    return `node ${getBin(packageName, binName)}`;
}
