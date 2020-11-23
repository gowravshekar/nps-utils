import { runBin } from "./binary";

/**
 * Gets a script that uses the rimraf binary. rimraf
 * is a dependency of nps-utils, so you don't need to
 * install it yourself.
 * @param args - args to pass to rimraf
 *   learn more from http://npm.im/rimraf
 * @return - the command with the rimraf binary
 */
export function rimraf(args: string): string {
    return `${runBin("rimraf")} ${args}`;
}
