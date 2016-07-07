import hardwareService from './hardware';
import softwareService from './software';
import networkService from './network';
import * as errMsgService from './error';
import * as reportService from './util/report';
import * as configService from './util/config';
import config from './config';
let logger;
if (config.env === 'development') {
  logger = require('tracer').colorConsole();
} else {
  logger = console;
}

export default class systemAgentCore {

  constructor({ ostype }) {
    // ostype: OSX, WINDOWS
    this.OSTYPE = ostype;
    global.logger = logger;
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

  getCpuBenchmark(callback) {
    return hardwareService[this.OSTYPE].getCpuBenchmark(callback);
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

  async getHostListPing(hostArray, cb) {
    return networkService[this.OSTYPE].getHostListPing(hostArray, cb);
  }

  async getUploadSpeed(host) {
    return networkService[this.OSTYPE].getUploadSpeed(host);
  }

  async getDownloadSpeed(host) {
    return networkService[this.OSTYPE].getDownloadSpeed(host);
  }

  traceRoute(host, ttlOrOptions, cb) {
    return networkService[this.OSTYPE].traceRoute(host, ttlOrOptions, cb);
  }

  async getErrorMsg(type) {
    return errMsgService.getMessage(type);
  }

  async callTeamview({ teamviewPath }) {
    return await softwareService[this.OSTYPE].callTeamview(teamviewPath);
  }

  async exportReport(info) {
    return await reportService.exportReport(info);
  }

  async getConfig() {
    return configService.getConfig();
  }
}
