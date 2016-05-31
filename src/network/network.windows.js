import { exec } from 'child-process-promise';

export async function getNetworkInfo() {
  try {
    const getNetworkSetup = async () => {
      const cmd = '';
      const result = await exec(cmd);
      return result.stdout;
    };

    const result = {
      networkSetup: await getNetworkSetup(),
    };

    return result;
  } catch (e) {
    throw e;
  }
}
