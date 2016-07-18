import { exec } from 'child-process-promise';
import networkService from '../network';
import format from '../util/format';
import { wmicArray } from '../util/wmic';
import { windowsExec } from '../util/windowsExec';

export async function getRamlInfo() {
  const tableName = 'MEMORYCHIP';
  const [
    sizeArray,
    speedArray,
  ] = await Promise.all([
    wmicArray(tableName, 'Capacity'),
    wmicArray(tableName, 'Speed'),
  ]);

  let ramSize = 0;
  const result = sizeArray.map((info, i) => {
    ramSize += (sizeArray[i] / 1024 / 1024 / 1024);
    return {
      size: `${sizeArray[i] / 1024 / 1024 / 1024}`,
      type: null,
      speed: `${speedArray[i]}`,
      status: 'OK',
    };
  });
  return ramSize;
};


export async function getHardwareInfo() {
  try {
    const getCpuInfo = async () => {
      const cmd = 'wmic cpu get name';
      const result = await exec(cmd);
      return format.formateWmic(result.stdout);
    };

    const getModelInfo = async () => {
      const cmd = 'wmic os get caption';
      const result = await windowsExec(cmd);
      return format.formateWmic(result);
    };

    const getRamlInfo = async () => {
      const tableName = 'MEMORYCHIP';
      const [
        sizeArray,
        speedArray,
      ] = await Promise.all([
        wmicArray(tableName, 'Capacity'),
        wmicArray(tableName, 'Speed'),
      ]);

      let ramSize = 0;
      const result = sizeArray.map((info, i) => {
        ramSize += (sizeArray[i] / 1024 / 1024 / 1024);
        return {
          size: `${sizeArray[i] / 1024 / 1024 / 1024}`,
          type: null,
          speed: `${speedArray[i]}`,
          status: 'OK',
        };
      });
      return ramSize;
    };

    const result = {
      model: await getModelInfo(),
      cpu: await getCpuInfo(),
      ram: await getRamlInfo(),
      network: await networkService.WINDOWS.getNetworkHardwareInfo(),
    };

    return result;
  } catch (e) {
    throw e;
  }
}
