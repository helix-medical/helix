function getNbLines(text) {
    return text.split(/\r\n|\r|\n/).length;
  }
  
export default getNbLines;