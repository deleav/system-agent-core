import {exec} from 'child-process-promise';
import * as softwareService from './software.js';
import * as networkService from './network.js'

export default class systemAgentCore{

  constructor({ostype}) {
    // ostype: OSX, WINDOWS
    this.OSTYPE = ostype;
  }

  greet() {
    return 'hello';
  }

  async getOSInfo() {
    return await softwareService.getOSInfo();
  }

  async getSoftwareInfo() {
    return await softwareService.getSoftwareInfo();
  }

  async getNetworkInfo() {
    return await networkService.getNetworkInfo();
  }

  async callTeamview({teamviewPath}) {
    return await softwareService.callTeamview();
  }
}
