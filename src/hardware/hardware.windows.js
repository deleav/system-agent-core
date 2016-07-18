import { wmicArray } from '../util/wmic';

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
}
