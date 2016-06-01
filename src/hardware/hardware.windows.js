import { exec } from 'child-process-promise';
import os from 'os';

function formateWmic(str) {
  const objRE = new RegExp(`\n(.*)`);
  const match = str.match(objRE);
  return match[1];
}

function formateWmicArray(str, key) {
  const objRE = new RegExp(`${key}=(.*)\r`, 'g');
  let match;
  let matchArray = [];
  while ((match = objRE.exec(str)) !== null) {
    if (match.index === objRE.lastIndex) {
      objRE.lastIndex++;
    }
    matchArray.push(match[1]);
  }
  return matchArray;
}

export async function getHardwareInfo() {
  try {
    const getCpuInfo = async () => {
      const cmd = 'wmic cpu get name';
      let result = await exec(cmd);
      return formateWmic(result.stdout);
    };

    const getModelInfo = async () => {
      const cmd = 'wmic os get caption';
      let result = await exec(cmd);
      return formateWmic(result.stdout);
    };

    const getRamlInfo = async () => {
      const getSizeCmd = 'wmic MEMORYCHIP get formfactor /VALUE';
      const getSizeResult = await exec(getSizeCmd);
      const sizeArray =  formateWmicArray(getSizeResult.stdout, 'FormFactor');

      const getSpeedCmd = 'wmic MEMORYCHIP get Speed /VALUE';
      const getSpeedResult = await exec(getSpeedCmd);
      const speedArray =  formateWmicArray(getSpeedResult.stdout, 'Speed');
      
      const result = sizeArray.map((info, i) => {
        return {
          size: `${sizeArray[i]} GB`,
          type: null,
          speed: `${speedArray[i]} MHz`,
          status: 'OK',
        }
      });
      return result;
    };

    const result = {
      model: await getModelInfo(),
      cpu: await getCpuInfo(),
      ram: await getRamlInfo(),
    };

    return result;
  } catch (e) {
    throw e;
  }
}
