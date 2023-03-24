function getNbLines(input, limit) {
  const lines = input.split(/\r\n|\r|\n/);
  const len = lines.length;
  return limit && len > limit ? limit : len;
}

export default getNbLines;