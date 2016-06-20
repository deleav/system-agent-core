import { exec } from 'child-process-promise';
import format from '../util/format';
import iconv from 'iconv-lite';
module.exports = {
  wmicArray: async(tableName, typeName) => {
    const cmd = `wmic ${tableName} get ${typeName} /VALUE`;
    const encoding = 'big5';
    const binaryEncoding = 'binary';
    const result = await exec(cmd, {encoding: binaryEncoding});
    const cmdDecode = iconv.decode(new Buffer(result.stdout, binaryEncoding), encoding);
    return format.formateWmicArray(cmdDecode, typeName);
  },
};
