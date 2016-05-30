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
    if (this.OSTYPE === 'OSX') {
    } else {
    }
    return await softwareService.getOSInfo();
  }

  async getSoftwareInfo() {
    if (this.OSTYPE === 'OSX') {
    } else {
    }
    return await softwareService.getSoftwareInfo();
  }

  async getNetworkInfo() {
    if (this.OSTYPE === 'OSX') {
    } else {
    }
    return await networkService.getNetworkInfo();
  }

  async callTeamview({teamviewPath}) {
    if (this.OSTYPE === 'OSX') {
    } else {
    }
    return await softwareService.callTeamview();
  }
}
