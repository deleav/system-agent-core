import { exec } from 'child-process-promise';
import networkService from '../network';
import format from '../util/format';
import { wmicArray } from '../util/wmic';

export async function getHardwareInfo() {
  try {
    const getCpuInfo = async () => {
      const cmd = 'wmic cpu get name';
      const result = await exec(cmd);
      return format.formateWmic(result.stdout);
    };

    const getModelInfo = async () => {
      const cmd = 'wmic os get caption';
      const result = await exec(cmd);
      return format.formateWmic(result.stdout);
    };

    const getRamlInfo = async () => {
      const tableName = 'MEMORYCHIP';
      const [
        sizeArray,
        speedArray,
      ] = await Promise.all([
        wmicArray(tableName, 'FormFactor'),
        wmicArray(tableName, 'Speed'),
      ]);

      const result = sizeArray.map((info, i) => {
        return {
          size: `${sizeArray[i]} GB`,
          type: null,
          speed: `${speedArray[i]} MHz`,
          status: 'OK',
        };
      });
      return result;
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
