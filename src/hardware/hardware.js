export const getCpuBenchmark = async () => {
  const starTime = Math.floor(new Date().getTime() / 1000);
  let score = 0;
  let shouldLoop = true;
  while (shouldLoop) {
    const nowTime = Math.floor(new Date().getTime() / 1000);
    score += 0.001;
    if (nowTime >= starTime + 10) shouldLoop = false;
  }
  return score;
};
