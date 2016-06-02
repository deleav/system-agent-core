import { exec } from 'child-process-promise';
import format from '../util/format';
module.exports = {
  wmicArray: async(tableName, typeName) => {
    const cmd = `wmic ${tableName} get ${typeName} /VALUE`;
    const result = await exec(cmd);
    return format.formateWmicArray(result.stdout, typeName);
  },
};
