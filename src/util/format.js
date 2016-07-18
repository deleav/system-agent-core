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

  roundDecimal: (val, precision) => {
    return Math.round(
      Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0)
    );
  }
};
