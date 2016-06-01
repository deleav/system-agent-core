import { exec } from 'child-process-promise';
import format from '../util/format';

async function wmic(tableName, typeName) {
  const cmd = `wmic ${tableName} get ${typeName} /VALUE`;
  const result = await exec(cmd);
  return format.formateWmicArray(result.stdout, typeName);
}

export async function getNetworkHardwareInfo() {
  const tableName = 'NIC';
  const [
    nameArray,
    adapterTypeArray,
    macAddressArray,
    netEnabledArray,
  ] = await Promise.all([
    wmic(tableName, 'Name'),
    wmic(tableName, 'AdapterType'),
    wmic(tableName, 'MACAddress'),
    wmic(tableName, 'NetEnabled'),
  ]);

  const result = nameArray.map((info, i) => {
    return {
      hardware: `${nameArray[i]} ${adapterTypeArray[i] || ''}`,
      device: null,
      ethernetAddress: macAddressArray[i] || null,
      enable: !!netEnabledArray[i] || false,
    };
  });

  return result;
}

export async function getNetworkInfo() {
  try {
    const result = {
      networkSetup: await getNetworkHardwareInfo(),
    };
    return result;
  } catch (e) {
    throw e;
  }
}
