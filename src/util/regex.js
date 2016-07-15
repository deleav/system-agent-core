import { exec } from 'child-process-promise';
import iconv from 'iconv-lite';
import metadata from '../metadata';

export async function regexMac(platform, device, target) {
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
    logger.info(result);
    return result;
  } catch (e) {
    logger.error(e);
    throw e;
  }
}

export async function regexWindows(platform, device, target) {
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
    logger.info(result);
    return result;
  } catch (e) {
    logger.error(e);
    throw e;
  }
}

export async function regex(platform, device, target) {
  try {
    let data;
    if (platform === 'OSX') {
      data = await regexMac(platform, device, target);
    } else {
      data = await regexWindows(platform, device, target);
    }
    let result = {};
    result[target] = data;
    return result;
  } catch (e) {
    logger.error(e);
    throw e;
  }
}

export async function regexAll(platform) {
  try {
    const datas = metadata[platform];
    for (const deviceKey of Object.keys(datas)) {
      const device = datas[deviceKey];
      const promises = Object.keys(device).map((targetKey) =>
        regex(platform, deviceKey, targetKey)
      );
      const getDatas = await Promise.all(promises);
      const result = {};
      // 整理 json
      getDatas.forEach((item) => {
        const key = Object.keys(item);
        const value = item[Object.keys(item)];
        // result[key] = value;
        result[key] = value[0];
      });
      datas[deviceKey] = result;
    }
    logger.log(datas);
  } catch (e) {
    logger.error(e);
    throw e;
  }
}
