function normalizeCode(code) {
  // remove leading/trailing whitespace
  code = code.trim();

  // replace any sequence of whitespace characters that is not part of
  // a string or comment with a single space
  code = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*|\s+/g, (match, offset, str) => {
    const prevChar = str[offset - 1];
    const nextChar = str[offset + match.length];

    // don't replace whitespace inside a string or comment
    if (/['"]/.test(prevChar) && /['"]/.test(nextChar)) {
      return match;
    }

    // replace with a single space
    return " ";
  });

  return code;
}

function compareCode(code1, code2) {
  return normalizeCode(code1) === normalizeCode(code2);
}

export default compareCode;
