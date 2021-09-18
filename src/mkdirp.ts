import { runBin } from "./binary";

/**
 * Gets a script that uses the mkdirp binary. mkdirp
 * is a dependency of nps-utils, so you don't need to
 * install it yourself.
 * @param args - args to pass to mkdirp
 *   learn more from http://npm.im/mkdirp
 * @return - the command with the mkdirp binary
 */
export function mkdirp(args: string): string {
    return `${runBin("mkdirp")} ${args}`;
}
