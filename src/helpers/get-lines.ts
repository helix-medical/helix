function getNbLines(input: string, limit?: number) {
    const len = input.split(/\r\n|\r|\n/).length;
    return limit && len > limit ? limit : len + 1;
}

export default getNbLines;
