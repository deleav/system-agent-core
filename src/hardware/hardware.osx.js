import { exec } from 'child-process-promise';

export async function getRamlInfo() {
  try {
    const cmd = 'system_profiler SPMemoryDataType';
    const result = await exec(cmd);
    const objRE = new RegExp('Size: (.*)\n.*Type: (.*)\n.*Speed: (.*)\n.*Status: (.*)\n', 'g');
    let match;
    let matchArray = [];
    while ((match = objRE.exec(result.stdout)) !== null) {
      if (match.index === objRE.lastIndex) {
        objRE.lastIndex++;
      }
      matchArray.push({
        size: match[1].replace('GB', ''),
        type: match[2],
        speed: match[3].replace('MHz', ''),
        status: match[4],
      });
    }
    return matchArray;
  } catch (e) {
    logger.error(e.message);
    throw e;
  }
}

export async function getHardwareFullInfo() {
  try {
    const getData = async () => {
      const cmd = 'system_profiler -xml -detailLevel basic';
      const result = await exec(cmd);
      return result.stdout;
    };

    const result = {
      data: await getData(),
    };

    return result;
  } catch (e) {
    throw e;
  }
}
