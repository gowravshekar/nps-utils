import { crossEnv } from "../src/crossEnv";

describe("Test crossEnv helper...", () => {
    it("Should get the runnable path of a crossEnv binary file", () => {
        expect(crossEnv("NODE_ENV=test jest")).toMatchSnapshot();
    });
});
