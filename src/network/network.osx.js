import ping from 'net-ping';
const session = ping.createSession();

export function getNetworkInfo(host, cb) {
  session.pingHost(host, (error, target, sent, rcvd) => {
    const ms = rcvd - sent;

    if (error) {
      cb({
        ping: error.toString(),
      });
    } else {
      cb({
        ping: ms,
      });
    }
  });
}
