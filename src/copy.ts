import { runBin } from "./binary";

/**
 * Gets a script that uses the cpy-cli binary. cpy-cli
 * is a dependency of nps-utils, so you don't need to
 * install it yourself.
 * @param args - args to pass to cpy-cli
 *   learn more from http://npm.im/cpy-cli
 * @return - the command with the cpy-cli binary
 */
export function copy(args: string): string {
    return `${runBin("cpy-cli", "cpy")} ${args}`;
}
