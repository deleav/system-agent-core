import { wmicArray } from '../util/wmic';

export async function getNetworkHardwareInfo() {
  const tableName = 'NIC';
  const [
    nameArray,
    adapterTypeArray,
    macAddressArray,
    netEnabledArray,
  ] = await Promise.all([
    wmicArray(tableName, 'Name'),
    wmicArray(tableName, 'AdapterType'),
    wmicArray(tableName, 'MACAddress'),
    wmicArray(tableName, 'NetEnabled'),
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
