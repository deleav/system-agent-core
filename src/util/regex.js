import { exec } from 'child-process-promise';
import iconv from 'iconv-lite';
import metadata from '../metadata';

export async function regexMac(device, platform, target) {
  try {
    const list = metadata[platform][device][target];
    const result = [];
    for (const data of list) {
      if (data.method) {
        const a = await data.method;
        result.push(a);
      } else {
        await exec(data.cmd)
          .then((cmdResult) => {
            const objRE = new RegExp(data.regex);
            const match = cmdResult.stdout.match(objRE);
            result.push(match[1] || data.default || null);
          })
          .catch((err) => {
            logger.error(err);
            result.push(data.default || null);
          });
      }
    }
    console.log(result);
    return result;
  } catch (e) {
    logger.error(e);
    throw e;
  }
}

export async function regexWindows(device, platform, target) {
  try {
    const list = metadata[platform][device][target];
    const result = [];
    for (const data of list) {
      if (data.method) {
        const a = await data.method;
        result.push(a);
      } else {
        const encoding = 'big5';
        const binaryEncoding = 'binary';
        await exec(data.cmd, { encoding: binaryEncoding })
          .then((cmdResult) => {
            const cmdDecode = iconv.decode(new Buffer(cmdResult.stdout, binaryEncoding), encoding);
            const objRE = new RegExp(data.regex);
            const match = cmdDecode.match(objRE);
            result.push(match[1] || data.default || null);
          })
          .catch((err) => {
            logger.error(err);
            result.push(data.default || null);
          });
      }
    }
    console.log(result);
    return result;
  } catch (e) {
    logger.error(e);
    throw e;
  }
}

export async function regex(device, platform, target) {
  try {
    if (platform === 'OSX') {
      await regexMac(device, platform, target);
    }
  } catch (e) {
    logger.error(e);
    throw e;
  }
}
