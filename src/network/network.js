import ping from 'net-ping';
import config from '../config';
import { roundDecimal } from '../util/format';
import speedTest from 'speedtest-net';

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
        logger.error(error.toString());
        // console.log(error);
        cb(9999, error.toString());
      } else {
        logger.info(ms);
        cb(ms);
      }
    });
  } catch (e) {
    logger.error(e.message);
    // console.log(e);
    cb(9999, 'permissionsDenied');
  }
}

export function pingArray(hostArray, i, newHostArray, cb) {
  try {
    getPingByRemoteHost(hostArray[i].host, (time) => {
      const newArray = newHostArray;
      const info = {
        ...hostArray[i],
        ping: time,
      };
      newArray.push(info);
      if (newArray.length === hostArray.length) {
        logger.info('pingArray finish');
        cb(newArray);
      } else {
        logger.info(info);
        pingArray(hostArray, i + 1, newArray, cb);
      }
    });
  } catch (e) {
    logger.error(e.message);
    throw e
  }
}

export async function getHostListPing(hostArray, cb) {
  try {
    pingArray(hostArray, 0, [], cb);
  } catch (e) {
    logger.error(e.message);
    throw e
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
          logger.info(error);
          trace += `${error.source} ttl=${ttl} ms=${ms} `;
        } else {
          logger.error(error.toString());
          trace += `${error.toString()} ttl=${ttl} ms=${ms} `;
        }
      } else {
        logger.info(target, ttl, sent, rcvd);
        trace += `${target} ttl=${ttl} ms=${ms} `;
      }
    }, (error, target) => {
      if (error) {
        logger.error(error.toString());
        trace += `${error.toString()}`;
      }
      cb(trace);
    });
  } catch (e) {
    logger.error(e.message);
    cb('permissionsDenied');
  }
}

export function getSpeed(host, cb) {
  try {
    const test = speedTest({maxTime: 5000});
    test.on('data', function(data) {
      logger.info(data);
      cb({
        download: roundDecimal(data.speeds.download, 2),
        upload: roundDecimal(data.speeds.upload, 2),
        clientIP: data.client.ip,
        ping: data.server.ping,
        downloadError: '',
        uploadError: '',
      });
    });
    test.on('error', function(err) {
      throw err;
    });
  } catch (e) {
    logger.error(e.message);
    cb({
      download: 0,
      upload: 0,
      clientIP: null,
      ping: 9999,
      downloadError: 'error',
      uploadError: 'error',
    });
  }
}
