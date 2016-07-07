const env = 'development';
// const env = 'production';
const config = require(`./${env}`);
export default {
  env,
  ...config.default,
};
