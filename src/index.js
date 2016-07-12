import fs from 'fs';
import hardwareService from './hardware';
import softwareService from './software';
import networkService from './network';
import * as errMsgService from './error';
import * as reportService from './util/report';
import * as configService from './util/config';
import config from './config';

export default class systemAgentCore {

  constructor({ ostype, logPath }) {
    // ostype: OSX, WINDOWS
    this.OSTYPE = ostype;
    let logger;
    if (config.env === 'development') {
      logger = require('tracer').colorConsole();
    } else {
      logger = require('tracer').console({
        transport: [
          function(data) {
            fs.appendFile(logPath || `${__dirname}/../error.log`, `level:${data.level}\n${JSON.stringify(data)}\n`, (err) => {
              if (err) throw err;
            });
          }
        ]
      });
    }
    global.logger = logger;
  }

  greet() {
    return 'hello';
  }

  async getOSInfo() {
    const osInfo = await softwareService[this.OSTYPE].getOSInfo();
    logger.info(osInfo);
    return osInfo;
  }

  async getHardwareInfo() {
    const hardwareInfo = await hardwareService[this.OSTYPE].getHardwareInfo();
    logger.info(hardwareInfo);
    return hardwareInfo
  }

  getCpuBenchmark(callback) {
    logger.info('getCpuBenchmark');
    return hardwareService[this.OSTYPE].getCpuBenchmark(callback);
  }

  async getSoftwareInfo() {
    const softwareInfo = await softwareService[this.OSTYPE].getSoftwareInfo();
    logger.info(softwareInfo);
    return softwareInfo;
  }

  async getNetworkInfo() {
    const networkInfo = networkService[this.OSTYPE].getNetworkInfo();
    logger.info(networkInfo);
    return networkInfo;
  }

  getPingByRemoteHost(host, cb) {
    logger.info('getPingByRemoteHost', host);
    return networkService[this.OSTYPE].getPingByRemoteHost(host, cb);
  }

  async getHostListPing(hostArray, cb) {
    logger.info('getHostListPing', hostArray);
    return networkService[this.OSTYPE].getHostListPing(hostArray, cb);
  }

  getSpeed(host, cb) {
    logger.info('getSpeed', host);
    networkService[this.OSTYPE].getSpeed(host, cb);
  }

  async getUploadSpeed(host) {
    const uploadSpeed = await networkService[this.OSTYPE].getUploadSpeed(host);
    logger.info(uploadSpeed);
    return uploadSpeed
  }

  async getDownloadSpeed(host) {
    const downloadSpeed = await networkService[this.OSTYPE].getDownloadSpeed(host);
    logger.info(downloadSpeed);
    return downloadSpeed
  }

  traceRoute(host, ttlOrOptions, cb) {
    logger.info('traceRoute',host, ttlOrOptions);
    return networkService[this.OSTYPE].traceRoute(host, ttlOrOptions, cb);
  }

  async getErrorMsg(type) {
    return errMsgService.getMessage(type);
  }

  async callTeamview({ teamviewPath }) {
    return await softwareService[this.OSTYPE].callTeamview(teamviewPath);
  }

  async exportReport(info) {
    logger.info('exportReport', info);
    return await reportService.exportReport(info);
  }

  async getConfig() {
    const config = await configService.getConfig();
    logger.info(config);
    return config;
  }
}
