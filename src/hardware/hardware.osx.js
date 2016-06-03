import { exec } from 'child-process-promise';
import * as lib from './hardware';

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

    const result = {
      cpu: await getCpuInfo(),
      detail: await getDetailInfo(),
      cpuBenchmark: await lib.getCpuBenchmark(),
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
