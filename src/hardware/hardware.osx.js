import { exec } from 'child-process-promise';

export async function getHardwareInfo() {
  try {
    const getCpuInfo = async () => {
      const cmd = 'sysctl -n machdep.cpu.brand_string';
      const result = await exec(cmd);
      return result.stdout.replace('\n', '');
    };

    const getDetailInfo = async () => {
      const cmd = 'system_profiler SPHardwareDataType';
      const result = await exec(cmd);
      return result.stdout;
    };

    const getCpuBenchmark = async () => {
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

    const result = {
      cpu: await getCpuInfo(),
      detail: await getDetailInfo(),
      cpuBenchmark: await getCpuBenchmark(),
    };

    return result;
  } catch (e) {
    throw e;
  }
}

export async function getHardwareFullInfo() {
  try {
    const getData = async () => {
      const cmd = 'system_profiler -detailLevel basic';
      const result = await exec(cmd);
      return result.stdout;
    };

    const result = {
      data: await getData(),
    };

    return result;
  } catch (e) {
    throw e;
  }
}
