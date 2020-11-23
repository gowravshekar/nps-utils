import isRunningInsideDocker from "is-docker";

/**
 * Check if the process is running inside a Docker container
 * @return - is running inside docker.
 */
export function isDocker(): boolean {
    return isRunningInsideDocker();
}
