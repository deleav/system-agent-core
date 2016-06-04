import { exec } from 'child-process-promise';

<<<<<<< HEAD
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
=======
export function getNetworkInfo(cb) {

  console.log('=== getNetworkInfo ===');
  const target = '172.217.25.99';


  session.pingHost(target, function(error, target, sent, rcvd) {
    const ms = rcvd - sent;

    if (error) {
      cb({
        error: `target: ${error.toString()}`
      })
    } else {
      cb({
        networkSetup: `target: Alive (ms = ${ms})`,
      })
    }
  });



>>>>>>> 3a201b89c882066657fc34d9d487246cb238b0a8
}
