import { exec } from 'child-process-promise';
import networkService from '../network';
import format from '../util/format';

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
      const getSizeCmd = 'wmic MEMORYCHIP get formfactor /VALUE';
      const getSizeResult = await exec(getSizeCmd);
      const sizeArray = format.formateWmicArray(getSizeResult.stdout, 'FormFactor');

      const getSpeedCmd = 'wmic MEMORYCHIP get Speed /VALUE';
      const getSpeedResult = await exec(getSpeedCmd);
      const speedArray = format.formateWmicArray(getSpeedResult.stdout, 'Speed');

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
