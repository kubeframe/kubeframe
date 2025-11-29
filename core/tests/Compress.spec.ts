import assert from "assert";
import { describe, it } from "mocha";
import { Compress } from "../src/util/Compress.js";

describe("Compress", () => {
    it("should compress and decompress a string", async () => {
        // Arrange
        const compress = new Compress();
        const stringToCompress = "Hello, world!";
        // Act
        const compressed = await compress.compress(stringToCompress);
        const decompressed = await compress.decompress(compressed);
        // Assert
        assert.strictEqual(decompressed, stringToCompress);
    });
});