import fs from 'fs';
import hardwareService from './hardware';
import softwareService from './software';
import networkService from './network';
import * as errMsgService from './error';
import * as reportService from './util/report';
import * as configService from './util/config';
import * as apiService from './util/callApi';
import { regexAll } from './util/regex';
import config from './config';
import { roundDecimal } from './util/format';
import { exec } from 'child-process-promise';
export default class systemAgentCore {

  constructor({ ostype, logPath, apiConfig }) {
    // ostype: OSX, WINDOWS
    this.OSTYPE = ostype;
    this.apiConfig = apiConfig;
    let logger;
    if (config.env === 'development') {
      logger = require('tracer').colorConsole();
    } else {
      logger = require('tracer').console({
        transport: [
          function(data) {
            fs.appendFile(logPath || `${__dirname}/../SystemAgent.log`, `level:${data.level}\n${JSON.stringify(data)}\n`, (err) => {
              if (err) throw err;
            });
          }
        ]
      });
    }
    global.logger = logger;
    this.logPath = logPath || `${__dirname}/../SystemAgent.log`;
  }

  greet() {
    return 'hello';
  }

  async openLogPath() {
    if (this.OSTYPE === 'OSX') {
      await exec(`open ${this.logPath.replace("SystemAgent.log", '')}`);
    } else {
      await exec(`explorer ${this.logPath.replace("SystemAgent.log", '')}`);
    }
  }

  async callApi(api, extraOption) {
    logger.info("callApi", api, this.apiConfig[api], extraOption)
    const option = this.apiConfig[api];
    const result = await apiService.callApi({ ...option, ...extraOption });
    return result;
  }

  async getOSInfo() {
    const osInfo = await softwareService[this.OSTYPE].getOSInfo();
    logger.info(osInfo);
    return osInfo;
  }

  async getAllInfo() {
    logger.info('getAllInfo', this.OSTYPE);
    const allData = await regexAll(this.OSTYPE);
    logger.info(allData);
    return allData;
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

  async getSpeed(testServer) {
    logger.info('getSpeed', testServer);
    // networkService[this.OSTYPE].getSpeed(host, cb);
    const [
      download,
      upload,
    ] = await Promise.all([
      this.getDownloadSpeed(testServer.downloadTest || testServer.uploadSpeedTestEndpoint),
      this.getUploadSpeed(testServer.uploadTest || testServer.downloadSpeedTestEndpoint),
    ]);
    const data = {
      download,
      upload,
      clientIP: '',
      ping: '',
      downloadError: '',
      uploadError: '',
    };
    logger.info(data);
    return data;
  }

  async getUploadSpeed(url) {
    logger.info('getUploadSpeed', url);
    // const uploadSpeed = await networkService[this.OSTYPE].getUploadSpeed(host);
    const startTime = Math.floor(new Date().getTime());
    await this.callApi('upload', { url });
    const doneTime = Math.floor(new Date().getTime());
    const time = doneTime - startTime;
    const size = 1048576 / 1024 / 1024 * 8;
    const uploadSpeed = roundDecimal(size / time * 1000, 2);
    logger.info(uploadSpeed, size, time);
    return uploadSpeed;
  }

  async getDownloadSpeed(url) {
    logger.info('getDownloadSpeed', url);
    // const downloadSpeed = await networkService[this.OSTYPE].getDownloadSpeed(host);
    const startTime = Math.floor(new Date().getTime());
    await this.callApi('download', { url });
    const doneTime = Math.floor(new Date().getTime());
    const time = doneTime - startTime;
    const size = 2011165 / 1024 / 1024 * 8;
    const downloadSpeed = roundDecimal(size / time * 1000, 2);
    logger.info(downloadSpeed, size, time);
    return downloadSpeed
  }

  traceRoute(host, ttlOrOptions, cb) {
    logger.info('traceRoute',host, ttlOrOptions);
    return networkService[this.OSTYPE].traceRoute(host, ttlOrOptions, cb);
  }

  async getErrorMsg(type) {
    return errMsgService.getMessage(type);
  }

  async sendReport(info, reportUrl, uploadFileUrl) {
    logger.info('sendReport', info);
    let result = {};
    result.error = [];
    const data = { ...info };
    if (info.audio) {
      const audioFileURL = await this.callApi('uploadFile', {
        url: uploadFileUrl,
        filePath: info.audio,
      });
      data.audio = audioFileURL.FileURL;
      if (audioFileURL.Message) {
        result.error.push(audioFileURL.Message);
      }
      if (audioFileURL.ErrMsg) {
        result.error.push(audioFileURL.ErrMsg);
      }
    }
    if (info.video) {
      const videoFileURL = await this.callApi('uploadFile', {
        url: uploadFileUrl,
        filePath: info.video,
      });
      data.video = videoFileURL.FileURL;
      if (videoFileURL.Message) {
        result.error.push(videoFileURL.Message);
      }
      if (videoFileURL.ErrMsg) {
        result.error.push(videoFileURL.ErrMsg);
      }
    }
    const report = await this.callApi('report', { url: reportUrl, data });
    logger.info('sendReportResult', report);
    if (report.status === 'N') {
      result.error.push(report.ErrMsg);
    }
    logger.info('sendReportResult', result);
    return result;
  }

  async getConfig() {
    // const config = await configService.getConfig();
    const config = await this.callApi('config');
    logger.info(config);
    return config;
  }
}
