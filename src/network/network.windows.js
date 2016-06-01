import { exec } from 'child-process-promise';
import format from '../util/format';

async function wmic(tableName, typeName) {
  const cmd = `wmic ${tableName} get ${typeName} /VALUE`;
  const result = await exec(cmd);
  const array = format.formateWmicArray(result.stdout, typeName);
  return format.formateWmicArray(array);
}

export async function getNetworkHardwareInfo() {
  // const getNameCmd = 'wmic NIC get Name /VALUE';
  // const getNameResult = await exec(getNameCmd);
  // const nameArray = format.formateWmicArray(getNameResult.stdout, 'Name');

  // const getAdapterTypeCmd = 'wmic NIC get AdapterType /VALUE';
  // const getAdapterTypeResult = await exec(getAdapterTypeCmd);
  // const adapterTypeArray = format.formateWmicArray(getAdapterTypeResult.stdout, 'AdapterType');

  // const getMACAddressCmd = 'wmic NIC get MACAddress /VALUE';
  // const getMACAddressResult = await exec(getMACAddressCmd);
  // const macAddressArray = format.formateWmicArray(getMACAddressResult.stdout, 'MACAddress');
  //
  // const getNetEnabledCmd = 'wmic NIC get NetEnabled /VALUE';
  // const getNetEnabledResult = await exec(getNetEnabledCmd);
  // const netEnabledArray = format.formateWmicArray(getNetEnabledResult.stdout, 'NetEnabled');

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
  ])

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
