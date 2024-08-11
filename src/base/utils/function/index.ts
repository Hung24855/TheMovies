export function getCharacterIndex(strings: string, character: string): number[] {
    const arrayIndex: number[] = [];
    let index: number = strings.indexOf(character);

    while (index !== -1) {
        arrayIndex.push(index);
        index = strings.indexOf(character, index + 1);
    }

    return arrayIndex;
}

export function normalizeWhitespace(inputString: string) {
    return inputString.replace(/\s+/g, " ");
}