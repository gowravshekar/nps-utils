import { crossEnv } from "../src/crossEnv";

describe("Test crossenv helper...", () => {
    it("Should get the runnable path of a crossenv binary file", () => {
        expect(crossEnv("NODE_ENV=test jest")).toMatchSnapshot();
    });
});
