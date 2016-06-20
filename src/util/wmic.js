import format from '../util/format';
import { windowsExec } from '../util/windowsExec';
module.exports = {
  wmicArray: async(tableName, typeName) => {
    const cmd = `wmic ${tableName} get ${typeName} /VALUE`;
    const result = await windowsExec(cmd);
    return format.formateWmicArray(result, typeName);
  },
};
