import { exec } from 'child-process-promise';
import iconv from 'iconv-lite';

module.exports = {
  windowsExec: async(cmd) => {
    const encoding = 'big5';
    const binaryEncoding = 'binary';
    const result = await exec(cmd, { encoding: binaryEncoding });
    const cmdDecode = iconv.decode(new Buffer(result.stdout, binaryEncoding), encoding);
    return cmdDecode;
  },
};
