import ping from 'net-ping';
const session = ping.createSession();

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



}
