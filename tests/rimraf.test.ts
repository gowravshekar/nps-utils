import { rimraf } from "../src/rimraf";

describe("Test rimraf helper...", () => {
    it("Should get the runnable path of a rimraf binary file", () => {
        expect(rimraf("build")).toMatchSnapshot();
    });
});
