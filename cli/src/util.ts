export function upperCaseFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function chunkArray<T>(array: T[], size: number) {
    let chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

export function formatComment(comment: string) {
    return splitAtNearestSpace(comment, 80)
        // Remove empty lines
        .filter(c => c.trim().length > 0)
        .join('\n');
}

function splitAtNearestSpace(text: string, maxLength: number) {
    const result = [];
    let start = 0;

    while (start  < text.length) {
        let end = start + maxLength;

        if (end >= text.length) {
            end = text.length;
        } else {
            while (end > start && text[end] !== ' ') {
                end--;
            }
        }

        result.push(text.slice(start, end));
        start = end + 1;
    }

    return result;
}
