import { exec } from 'child-process-promise';

export async function getNetworkInfo() {
  try {
    const getNetworkSetup = async () => {
      const cmd = 'node_modules/speed-test/cli.js --json';
      const result = await exec(cmd);

      return result.stdout;
    };

    const info = await getNetworkSetup();

    const result = {
      ping: info.ping,
      download: info.download,
      upload: info.upload,
    };

    return result;
  } catch (e) {
    throw e;
  }
}
