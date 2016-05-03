import {exec} from 'child-process-promise';

export default class systemAgentCore{

  constructor({ostype}) {
    this.OSTYPE = ostype;
  }

  greet() {
    return 'hello';
  }

  async getOSInfo() {
    try {
      let result = await exec('system_profiler SPSoftwareDataType');
      return result;
    } catch (e) {
      throw e;
    }
  }
}
