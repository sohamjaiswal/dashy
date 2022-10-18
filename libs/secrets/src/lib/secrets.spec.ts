import { secrets } from "./secrets";

describe("secrets", () => {
    it("should work", () => {
        expect(secrets()).toEqual("secrets");
    });
});
