import { exec } from 'child-process-promise';
import * as lib from './hardware';

export async function getHardwareInfo() {
  try {
    const getCpuInfo = async () => {
      const cmd = 'sysctl -n machdep.cpu.brand_string';
      const result = await exec(cmd);
      return result.stdout;
    };

    const result = {
      cpu: await getCpuInfo(),
      cpuBenchmark: await lib.getCpuBenchmark(),
    };

    return result;
  } catch (e) {
    throw e;
  }
}
