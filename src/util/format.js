module.exports = {
  formateWmic: (str) => {
    const objRE = new RegExp(`\n(.*)`);
    const match = str.match(objRE);
    return match[1];
  },

  formateWmicArray: (str, key) => {
    const objRE = new RegExp(`${key}=(.*)\r`, 'g');
    let match;
    let matchArray = [];
    while ((match = objRE.exec(str)) !== null) {
      if (match.index === objRE.lastIndex) {
        objRE.lastIndex++;
      }
      matchArray.push(match[1]);
    }
    return matchArray;
  },

}
