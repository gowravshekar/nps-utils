import { series, seriesNPS } from "../src/series";

describe("Test Series Helpers...", () => {
    it("Should combine multiple commands into one command", () => {
        const args = ["echo hey", null, "echo hi", undefined, "echo there"] as string[];

        expect(series(...args)).toMatchSnapshot();
    });

    it("Should combine multiple nps commands into one command", () => {
        const args = [
            "test",
            false,
            "lint.src",
            null,
            "lint.scripts --cache",
            undefined,
            " ",
            "build --fast",
        ] as string[];

        expect(seriesNPS(...args)).toMatchSnapshot();
    });
});
