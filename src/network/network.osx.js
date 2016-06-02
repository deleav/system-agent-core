import ping from 'net-ping';
const session = ping.createSession();

export function getPingByRemoteHost(host, cb) {
  session.pingHost(host, (error, target, sent, rcvd) => {
    const ms = rcvd - sent;

    if (error) {
      cb(error.toString());
    } else {
      cb(ms);
    }
  });
}
