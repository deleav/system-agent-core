import SystemAgentCore from '../../src';
import os from 'os';
import apiConfig from '../../src/config/api';

describe('systemAgentCore', () => {
  let systemAgentCore = null;
  let config;
  before(async(done) => {
    try {
      if (os.type() === 'Darwin') {
        // Darwin 是 node 上的 OSX 代號
        systemAgentCore = new SystemAgentCore({
          ostype: 'OSX',
          apiConfig,
        });
      } else {
        systemAgentCore = new SystemAgentCore({
          ostype: 'WINDOWS',
          apiConfig,
        });
      }
      config = await systemAgentCore.callApi('config');
      logger.info(config);
      done()
    } catch (e) {
      logger.error(e);
      done(e)
    }
  });

  it('regexAll', async(done) => {
    try {
      const data = await systemAgentCore.getAllInfo();
      console.log(data);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('should get OS info', async(done) => {
    try {
      const result = await systemAgentCore.getOSInfo();
      result.should.has.keys('OSSoftwareData');

      done();
    } catch (e) {
      done(e);
    }
  });

  it('should get software info', async (done) => {
    try {
      const result = await systemAgentCore.getSoftwareInfo();
      console.log(result);
      result.should.has.keys('safari', 'chrome', 'flash', 'ie', 'firefox', 'browser360', 'opera');

      done();
    } catch (e) {
      done(e);
    }
  });

  it('should get Ping', (done) => {
    systemAgentCore.getPingByRemoteHost('172.217.25.99', (result) => {
      console.log(`ping: ${result}`);

      try {
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it('should get upload speed', async(done) => {
    try {
      const testServer = config.testServer[0];
      const result = await systemAgentCore.getUploadSpeed(testServer.uploadTest);
      console.log(`upload speed: ${result} Mbps`);

      done();
    } catch (e) {
      done(e);
    }
  });

  it('should get download speed', async(done) => {
    try {
      const testServer = config.testServer[0];
      const result = await systemAgentCore.getDownloadSpeed(testServer.downloadTest);
      console.log(`download speed: ${result} Kbps`);

      done();
    } catch (e) {
      done(e);
    }
  });

  it('should call back network speed', async(done) => {
    try {
      const testServer = config.testServer[0];
      const result = await systemAgentCore.getSpeed(testServer);
      result.should.has.keys('download', 'upload', 'clientIP', 'ping', 'downloadError', 'uploadError');
      done();
    } catch (e) {
      done(e);
    }
  });

  it('should trace route', (done) => {
    systemAgentCore.traceRoute('172.217.25.99', 30, (result) => {
      console.log('trace route: \n', result);

      try {
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it('get osx hardware info', async(done) => {
    try {
      const result = await systemAgentCore.getHardwareInfo();
      console.log(result);
      result.should.has.keys('model', 'cpu', 'ram', 'network');
      done();
    } catch (e) {
      done(e);
    }
  });

  function echo(b) {
    console.log(b);
  }

  it('get getCpuBenchmark', (done) => {
    try {
      const result = systemAgentCore.getCpuBenchmark(echo);
      console.log(result);
      done();
    } catch (e) {
      done(e);
    }
  });

  it.skip('export report file by system info', async(done) => {
    try {
      const src = {
        cpuBenchmark: '48255.59',
        networkInfo: {
          ping: '47',
          upload: '1861818.18',
          download: '81269.84',
        },
        cpu: 'Intel(R) Core(TM) i5-5250U CPU @ 1.60GHz',
        model: 'MacBookAir7,2',
        systemVersion: 'OS X El Capitan 10.11.3',
        ram: [
          {
            size: '4 GB',
            speed: '1600 MHz',
            status: 'OK',
            type: 'DDR3',
          }, {
            size: '4 GB',
            speed: '1600 MHz',
            status: 'OK',
            type: 'DDR3',
          },
        ],
        network: [
          {
            device: 'en0',
            ethernetAddress: 'e0:ac:cb:9b:75:d2',
            hardware: 'Wi-Fi',
          }, {
            device: 'en1',
            ethernetAddress: '9a:00:03:f4:55:80',
            hardware: 'Thunderbolt 1',
          }, {
            device: 'en2',
            ethernetAddress: 'e0:ac:cb:9b:75:d3',
            hardware: 'Bluetooth PAN',
          }, {
            device: 'bridge0',
            ethernetAddress: 'e2:ac:cb:b9:85:00',
            hardware: 'Thunderbolt Bridge',
          },
        ],
        software: {
          chrome: '51.0.2704.84',
          flash: '21.0.0.226',
          safari: '9.0.3',
        },
        traceRoute: [
          '172.217.25.99 : 211.72.239.254 (ttl=1 ms=6)',
          '172.217.25.99 : 168.95.229.166 (ttl=2 ms=4)',
          '172.217.25.99 : 220.128.16.234 (ttl=3 ms=7)',
          '172.217.25.99 : 220.128.16.29 (ttl=4 ms=8)',
          '172.217.25.99 : 220.128.18.193 (ttl=5 ms=6)',
          '172.217.25.99 : 72.14.205.150 (ttl=6 ms=10)',
          '172.217.25.99 : 216.239.62.178 (ttl=7 ms=50)',
          '172.217.25.99 : 209.85.242.163 (ttl=8 ms=12)',
          '172.217.25.99 : 216.239.41.152 (ttl=9 ms=45)',
          '172.217.25.99 : 209.85.243.238 (ttl=10 ms=46)',
          '172.217.25.99 : 209.85.253.163 (ttl=11 ms=46)',
          '172.217.25.99 : 108.170.233.83 (ttl=12 ms=49)',
          '172.217.25.99 : 172.217.25.99 (ttl=13 ms=46)',
        ],
      };

      src.should.has.keys('model', 'cpu', 'cpuBenchmark', 'ram', 'systemVersion',
        'software', 'network', 'networkInfo', 'traceRoute');
      src.software.should.has.keys('chrome', 'flash', 'safari');
      src.networkInfo.should.has.keys('upload', 'ping', 'download');

      const result = await systemAgentCore.exportReport(src);
      result.should.be.equal(true);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('get download error message', async(done) => {
    try {
      const result = await systemAgentCore.getErrorMsg('ERROR_NETWORK_DOWNLOAD');
      console.log(result);
      done();
    } catch (e) {
      done(e);
    }
  });

  it.skip('get server config', async(done) => {
    try {
      const result = await systemAgentCore.getConfig();
      result.should.has.keys('ad', 'testServer', 'report', 'debug');
      console.log(result);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('get Host List Ping', async(done) => {
    const hostArray = [{
      name: '測試站1',
      host: '192.168.168.114',
    }, {
      name: '測試站2',
      host: '172.217.25.99',
    }, {
      name: '測試站3',
      host: '127.0.0.1',
    }];
    systemAgentCore.getHostListPing(hostArray, (result) => {
      console.log(result);
      try {
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it.only('test send report', async(done) => {
    try {
      const data = {
        email: 'dan826@gmail.com',
        audio: null,
        video: null,
        cpuBenchmark: 6.94,
        network: {
          ip: '203.69.82.146',
          ping: 28,
          upload: 1.1,
          download: 1.22,
          traceRoute: '',
        },
        cpu: 'Intel(R) Core(TM) i5-5287U CPU @ 2.90GHz',
        model: 'MacBookPro12,1',
        modelVersion: '',
        ram: {
          size: '16',
          speed: '',
          status: '',
          type: '',
        },
        networkInterface: {
          device: 'en0',
          ethernetAddress: 'a0:99:9b:04:d7:a1',
          hardware: 'Wi-Fi',
          enable: true,
        },
        software: {
          browser360: null,
          chrome: '51.0.2704.106 ',
          firefox: '46.0.1',
          flash: 'notFound',
          ie: null,
          opera: '38.0.2220.41',
          safari: '9.1.1',
        },
      };
      const result = await systemAgentCore.sendReport(
        data,
        'http://203.75.213.133/PMIT_TEST/api/Report',
        'http://203.75.213.133/PMIT_TEST/api/UploadFile'
      );
      done();
    } catch (e) {
      done(e);
    }
  });
});
