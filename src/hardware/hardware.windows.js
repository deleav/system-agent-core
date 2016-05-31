import { exec } from 'child-process-promise';

export async function getHardwareInfo() {
  try {
    const getCpuInfo = async () => {
      const cmd = 'sysctl -n machdep.cpu.brand_string';
      const result = await exec(cmd);
      return result.stdout;
    };

    const result = {
      cup: await getCpuInfo(),
    };

    return result;
  } catch (e) {
    throw e;
  }
}
