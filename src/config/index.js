const env = 'development';
// const env = 'production';
const config = require(`./${env}`);

console.log(config.default);
export default {
  ...config.default,
};
