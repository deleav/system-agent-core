import { exec } from 'child-process-promise';
import ping from 'net-ping';
const session = ping.createSession();

export async function getNetworkInfo() {
  try {
    const getNetworkSetup = async () => {

      const target = "172.217.25.99";

      const result = await new Promise((done) => {
        session.pingHost (target, function(error, target, sent, rcvd) {
          console.log(target);
          const ms = rcvd - sent;
          if (error) {
            // done(target + ": " + error.toString ());
          } else {
            // done(target + ": Alive (ms=" + ms + ")");
          }
        });
      });
      console.log('getNetworkSetup', result);
      return result;
      // return ms;
      // const cmd = 'networksetup -listallhardwareports';
      // const result = await exec(cmd);
      // return result.stdout;
    };

    const result = {
      networkSetup: await getNetworkSetup(),
    };

    return result;
  } catch (e) {
    throw e;
  }
}
