import { roundDecimal } from '../util/format';

function benchmark(callback) {
  let score = 0;
  const loop = setInterval(() => {
    score += 0.001;
  }, 0);

  setTimeout(() => {
    clearInterval(loop);
    callback(roundDecimal(score, 2));
  }, 10000);
}

export const getCpuBenchmark = (callback) => {
  setImmediate(() => { benchmark(callback); });
  return 'ok';
};
