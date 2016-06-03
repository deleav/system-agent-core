import hardwareService from './hardware';
import softwareService from './software';
import networkService from './network';

export default class systemAgentCore {

  constructor({ ostype }) {
    // ostype: OSX, WINDOWS
    this.OSTYPE = ostype;
  }

  greet() {
    return 'hello';
  }

  async getOSInfo() {
    return await softwareService[this.OSTYPE].getOSInfo();
  }

  async getHardwareInfo() {
    return await hardwareService[this.OSTYPE].getHardwareInfo();
  }

  async getSoftwareInfo() {
    return await softwareService[this.OSTYPE].getSoftwareInfo();
  }

  async getNetworkInfo() {
    return networkService[this.OSTYPE].getNetworkInfo();
  }

  getPingByRemoteHost(host, cb) {
    return networkService[this.OSTYPE].getPingByRemoteHost(host, cb);
  }

  async getUploadSpeed() {
    return networkService[this.OSTYPE].getUploadSpeed();
  }

  async getDownloadSpeed() {
    return networkService[this.OSTYPE].getDownloadSpeed();
  }

  traceRoute(host, ttlOrOptions, cb) {
    return networkService[this.OSTYPE].traceRoute(host, ttlOrOptions, cb);
  }

  async callTeamview({ teamviewPath }) {
    return await softwareService[this.OSTYPE].callTeamview(teamviewPath);
  }
}
