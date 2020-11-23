import { copy } from "../src/copy";

describe("Test copy helper...", () => {
    it("Should get the runnable path of a copy binary file", () => {
        expect(copy('"**/*.html" "../dist/" --cwd=src --parents')).toMatchSnapshot();
    });
});
