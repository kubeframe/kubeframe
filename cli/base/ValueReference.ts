/**
 * Utility class to store a reference to a value that can be retrieved later during serialization.
 */
export class ValueReference<T> {
    constructor(private retriever: () => T) {}

    toJSON() {
        return this.retriever();
    }
}
