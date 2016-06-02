import ping from 'net-ping';
const session = ping.createSession();

export function getNetworkInfo(cb) {
  try {
    const target = '172.217.25.99';

    const result = new Promise((resolve,reject) => {
      session.pingHost(target, function(error, target, sent, rcvd) {
        const ms = rcvd - sent;

        if (error) {
          reject(`target: ${error.toString()}`);
        } else {
          resolve(`target: Alive (ms = ${ms})`);
        }
      });
    });


    result.then((that) => {

      cb({
        networkSetup: that,
      })

    })
  } catch (e) {
    throw e;
  }
}
