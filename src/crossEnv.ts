import { runBin } from "./binary";

/**
 * Gets a script that uses the cross-env binary. cross-env
 * is a dependency of nps-utils, so you don't need to
 * install it yourself.
 * @param args - args to pass to cross-env
 *   learn more from http://npm.im/cross-env
 * @return - the command with the cross-env binary
 */
export function crossEnv(args: string): string {
    return `${runBin("cross-env")} ${args}`;
}
