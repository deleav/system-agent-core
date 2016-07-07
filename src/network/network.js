import ping from 'net-ping';
import Client from 'ftp';
import config from '../config';
import fs from 'fs';
import { roundDecimal } from '../util/format';
import speedTest from 'speedtest-net';
import axios from 'axios';

const { ulConfig, dlConfig } = config;

export function getPingByRemoteHost(host, cb) {
  try {
    const session = ping.createSession({
      networkProtocol: ping.NetworkProtocol.IPv4,
      packetSize: 16,
      retries: 1,
      sessionId: (process.pid % 65535),
      timeout: 500,
      ttl: 128,
    });
    session.pingHost(host, (error, target, sent, rcvd) => {
      const ms = rcvd - sent;
      if (error) {
        cb(9999, error.toString());
      } else {
        cb(ms);
      }
    });
  } catch (e) {
    cb(9999, 'permissionsDenied');
  }
}

export function pingArray(hostArray, i, newHostArray, cb) {
  try {
    getPingByRemoteHost(hostArray[i].host, (time) => {
      const newArray = newHostArray;
      newArray.push({
        name: hostArray[i].name,
        host: hostArray[i].host,
        time,
      });
      if (newArray.length === hostArray.length) {
        cb(newArray);
      } else {
        pingArray(hostArray, i + 1, newArray, cb);
      }
    });
  } catch (e) {
    throw e
  }
}

export async function getHostListPing(hostArray, cb) {
  try {
    pingArray(hostArray, 0, [], cb);
  } catch (e) {
    throw e
  }
}

export async function getUploadSpeed(host) {
  // const client = new Client();
  // const speedTestUpload = (done) => {
  //
  // };
  //
  // const startUpload = (done, err) => {
  //   const startTime = Math.floor(new Date().getTime());
  //   client.put(`${__dirname}/../../test10MB`, ulConfig.dest, (err, list) => {
  //     client.list(ulConfig.folder, (err, list) => {
  //       if (err) {
  //         done(err.toString());
  //       } else {
  //         client.end();
  //         const doneTime = Math.floor(new Date().getTime());
  //
  //         done(roundDecimal(8 * 1 * 1024 / (doneTime - startTime) * 1000, 2));
  //       }
  //     });
  //   });
  // };
  try {
  //   client.connect({
  //     host: host || ulConfig.host,
  //     user: ulConfig.user,
  //     password: ulConfig.pwd,
  //   });
  //
  //   const uploadFile = async () => {
  //     const result = await new Promise((done) => {
  //       getPingByRemoteHost(ulConfig.host, (ping) => {
  //         if (ping !== 9999) {
  //           fs.stat(`${__dirname}/../../test10MB`, (err) => {
  //             if (err) {
  //               if (err.code === 'ENOENT') {
  //                 fs.writeFile(`${__dirname}/../../test10MB`, new Buffer(1024 * 1024 * 1), () => {
  //                   client.on('ready', () => {
  //                     client.delete(ulConfig.dest, (err) => {
  //                       client.list(ulConfig.folder, (err, list) => {
  //                         startUpload(done, err, list);
  //                       });
  //                     });
  //                   });
  //                 });
  //               } else {
  //                 console.log('Some other error: ', err.code);
  //                 done(err.toString());
  //               }
  //             } else {
  //               startUpload(done, null, null);
  //             }
  //           });
  //         } else {
  //           done('error');
  //         }
  //       });
  //     });
  //
  //     return result;
  //   };

  // return await uploadFile();

    const speedTestUpload = async () => {
      const test = speedTest({maxTime: 5000});
      const result = await new Promise((done) => {
        test.on('uploadspeed', function(speed) {
          console.log(speed);
          done(roundDecimal(speed, 2))
        });
        test.on('error', function(err) {
          console.log(err);
          done('error')
        });
      });
      return result;
    };
    return await speedTestUpload();
  } catch (e) {
    return 'permissionsDenied';
    // throw e;
  }
}

export async function getDownloadSpeed(host) {
  try {
    // const client = new Client();
    // client.connect({
    //   host: host || dlConfig.host,
    //   user: dlConfig.user,
    //   password: dlConfig.pwd,
    // });
    //
    // const downloadFile = async () => {
    //   const result = await new Promise((done) => {
    //     getPingByRemoteHost(ulConfig.host, (ping) => {
    //       if (ping !== 9999) {
    //         client.on('ready', () => {
    //           const startTime = Math.floor(new Date().getTime());
    //           console.log(`download startTime: ${startTime}`);
    //           client.get(dlConfig.target, (err, stream) => {
    //             if (err) {
    //               done(err.toString());
    //             } else {
    //               stream.once('close', () => {
    //                 const doneTime = Math.floor(new Date().getTime());
    //                 console.log(`download doneTime: ${doneTime}`);
    //
    //                 client.end();
    //                 done(roundDecimal(8 * 3 * 1024 / (doneTime - startTime) * 1000, 2));
    //               });
    //             }
    //           });
    //         });
    //       } else {
    //         done('error');
    //       }
    //     });
    //   });
    //
    //   return result;
    // };
    //
    // return await downloadFile();
    const speedTestDownload = async () => {
      const test = speedTest({maxTime: 5000});
      const result = await new Promise((done) => {
        test.on('downloadspeed', function(speed) {
          console.log(speed);
          done(roundDecimal(speed, 2))
        });
        test.on('error', function(err) {
          console.log(err);
          done('error')
        });
      });
      return result;
    };
    return await speedTestDownload();
  } catch (e) {
    return 'permissionsDenied';
  }
}

export function traceRoute(host, ttlOrOptions, cb) {
  try {
    const session = ping.createSession();
    let trace = '';
    session.traceRoute(host, ttlOrOptions, (error, target, ttl, sent, rcvd) => {
      const ms = rcvd - sent;
      if (error) {
        if (error instanceof ping.TimeExceededError) {
          trace += `${error.source} ttl=${ttl} ms=${ms} `;
        } else {
          trace += `${error.toString()} ttl=${ttl} ms=${ms} `;
        }
      } else {
        trace += `${target} ttl=${ttl} ms=${ms} `;
      }
    }, (error, target) => {
      if (error) {
        trace += `${error.toString()}`;
      }
      cb(trace);
    });
  } catch (e) {
    cb('permissionsDenied');
  }
}

export async function getPublicIp(providers) {
  let publicIp;
  try {
    const ipApis = [
      'http://ipv4bot.whatismyipaddress.com/',
      'http://api.ipify.org/',
      'http://ip-api.com/json',
    ];
    ipApis.push(...providers);
    console.log('providers =>', providers);
    console.log('ipApis =>', ipApis);

    const results = [];
    // get user's public ip from providers
    for (const api of ipApis) {
      const result = await axios.get(api);
      if (typeof result.data === 'object') {
        results.push(result.data.query);
      } else if (typeof result.data !== 'undefined') {
        results.push(result.data);
      }
    }

    let count = 0;
    const trustThreshold = Math.ceil((ipApis.length - 1) / 2);
    // check ip usable by compare each provider's return data.
    for (const ip of results) {
      if (typeof ip === 'string') {
        const length = ip.split('.').length;
        if (length === 4) {
          publicIp = ip;
          count++;
        }
      }
      console.log('ip=>', ip, 'count=>', count);
    }
    console.log('trustThreshold =>', trustThreshold, 'final count=>', count);

    if (count < trustThreshold) publicIp = results;
    return publicIp;
  } catch (e) {
    console.log('getPublicIp error=>', e);
    return e;
  }
} // end getPublicIp
