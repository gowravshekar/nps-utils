import { getBin, runBin } from "../src/binary";

describe("Test Binary Helpers...", () => {
    it("Should get the path of a binary file", () => {
        expect(getBin("rimraf")).toMatchSnapshot();
    });

    it("Should get the runnable path of a binary file", () => {
        expect(runBin("rimraf")).toMatchSnapshot();
    });
});
