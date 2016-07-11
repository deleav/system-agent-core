import { exec } from 'child-process-promise';
import networkService from '../network';
import format from '../util/format';

export async function getHardwareInfo() {
  try {
    const getCpuInfo = async () => {
      const cmd = 'sysctl -n machdep.cpu.brand_string';
      const result = await exec(cmd);
      return result.stdout.replace('\n', '');
    };

    const getModelInfo = async () => {
      const cmd = 'system_profiler SPHardwareDataType';
      const result = await exec(cmd);
      // 識別碼對照型號 https://support.apple.com/zh-tw/HT201300
      return format.formateSystemProfiler(result.stdout, 'Model Identifier');
    };

    const getRamlInfo = async () => {
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
    };


    const result = {
      model: await getModelInfo(),
      cpu: await getCpuInfo(),
      ram: await getRamlInfo(),
      network: await networkService.OSX.getNetworkHardwareInfo(),
    };
    logger.info(result)
    return result;
  } catch (e) {
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
