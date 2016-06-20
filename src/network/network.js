import ping from 'net-ping';
import Client from 'ftp';
import config from '../config';

const { ulConfig, dlConfig } = config;

export function getPingByRemoteHost(host, cb) {
  const session = ping.createSession();
  session.pingHost(host, (error, target, sent, rcvd) => {
    const ms = rcvd - sent;

    if (error) {
      cb(error.toString());
    } else {
      cb(ms);
    }
  });
}

export async function getUploadSpeed() {
  const client = new Client();
  try {
    client.connect({
      host: ulConfig.host,
      user: ulConfig.user,
      password: ulConfig.pwd,
    });

    const uploadFile = async () => {

      const result = await new Promise((done) => {
        client.on('ready', () => {

          client.delete(ulConfig.src, (err) => {

            client.list(ulConfig.folder, (err, list) => {
              console.log('before upload', list);
              const startTime = Math.floor(new Date().getTime());
              console.log(`upload startTime: ${startTime}`, new Date());
              console.log('file dir', __dirname+'/../../test10MB');
              client.put(__dirname+'/../../test10MB', ulConfig.dest, (err) => {

                client.list(ulConfig.folder, (err, list) => {
                  console.log('after upload', list);
                  if (err) {
                    done(err.toString());
                  } else {
                    client.end();
                    const doneTime = Math.floor(new Date().getTime());
                    console.log(`upload doneTime: ${doneTime}`, new Date());

                    done(8 * 10 * 1024 / (doneTime - startTime) * 1000);
                  }
                });
              });


            });

          })
        });
      });

      return result;
    };

    return await uploadFile();
  } catch (e) {
    throw e;
  }
}

export async function getDownloadSpeed() {
  const client = new Client();
  try {
    client.connect({
      host: dlConfig.host,
      user: dlConfig.user,
      password: dlConfig.pwd,
    });

    const downloadFile = async () => {

      const result = await new Promise((done) => {
        client.on('ready', () => {
          const startTime = Math.floor(new Date().getTime());
          console.log(`download startTime: ${startTime}`);
          client.get(dlConfig.target, (err, stream) => {
            if (err) {
              done(err.toString());
            } else {
              stream.once('close', () => {
                const doneTime = Math.floor(new Date().getTime());
                console.log(`download doneTime: ${doneTime}`);

                client.end();
                done(8 * 10 * 1024 / (doneTime - startTime) * 1000);
              });
            }
          });
        });
      });

      return result;
    };

    return await downloadFile();
  } catch (e) {
    throw e;
  }
}

export function traceRoute(host, ttlOrOptions, cb) {
  const session = ping.createSession();
  const traceArr = [];
  session.traceRoute(host, ttlOrOptions, (error, target, ttl, sent, rcvd) => {
    const ms = rcvd - sent;
    if (error) {
      if (error instanceof ping.TimeExceededError) {
        traceArr.push(`${target} : ${error.source} (ttl=${ttl} ms=${ms})`);
      } else {
        traceArr.push(`${target} : ${error.toString()} (ttl=${ttl} ms=${ms})`);
      }
    } else {
      traceArr.push(`${target} : ${target} (ttl=${ttl} ms=${ms})`);
    }
  }, (error, target) => {
    if (error) {
      traceArr.push(`${target} : ${error.toString()}`);
    }
    cb(traceArr);
  });
}
