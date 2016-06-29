const env = 'development';
// const env = 'producion';
const config = require(`./${env}`);

console.log(config.default);
export default {
  ...config.default,
};
