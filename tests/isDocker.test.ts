import { isDocker } from "../src/isDocker";

describe("Test docker helper...", () => {
    it("Should return true if this is running inside docker", () => {
        const isRunningInsideDocker = isDocker();

        expect(typeof isRunningInsideDocker === "boolean").toBeTruthy();
    });
});
