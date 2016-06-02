import ping from 'net-ping';
const session = ping.createSession();

export async function getNetworkInfo() {
  try {
    const getNetworkSetup = async () => {
      const target = '172.217.25.99';

      const result = new Promise((done) => {
        session.pingHost(target, function(error, target, sent, rcvd) {
          const ms = rcvd - sent;

          if (error) {
            done(`target: ${error.toString()}`);
          } else {
            done(`target: Alive (ms = ${ms})`);
          }
        });
      });
      console.log('getNetworkSetup', result);
      return result;
    };

    const result = {
      networkSetup: await getNetworkSetup(),
    };

    return result;
  } catch (e) {
    throw e;
  }
}
