import SystemAgentCore from '../../src';
import os from 'os';
import Client from 'ftp';
var JSFtp = require("jsftp");

describe('systemAgentCore', () => {
  let systemAgentCore = null;
  beforeEach(() => {
    if (os.type() === 'Darwin') {
      // Darwin 是 node 上的 OSX 代號
      systemAgentCore = new SystemAgentCore({
        ostype: 'OSX',
      });
    } else {
      systemAgentCore = new SystemAgentCore({
        ostype: 'WINDOWS',
      });
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

  it.only('should get software info', async (done) => {
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
      const result = await systemAgentCore.getUploadSpeed();
      console.log(`upload speed: ${result} Kbps`);

      done();
    } catch (e) {
      done(e);
    }
  });

  it('test jsftp module', async(done) => {
    try {
      const jsftp = new JSFtp({
        host: '139.162.20.180',
        user: 'deploy',
        pass: 'ts22019020',
      });

      jsftp.ls("./uploads", function(err, res) {
        console.log(err, res);
        jsftp.put(new Buffer(1024 * 1024 * 10), 'uploads/test10MB', function(hadError) {
          if (!hadError)
            console.log("File transferred successfully!");
          done()
        });
      });
    } catch (e) {
      done(e);
    }
  });

  it.skip('test ftp module', async(done) => {
    try {
      const client = new Client();
      client.connect({
      });
      client.list('uploads', (err, list) => {
        if (err) {
          done(err.toString());
        } else {
          console.log(list);

          client.end();
            done()
        }
      });
    } catch (e) {
      done(e);
    }
  });


  it('should upload fail', async(done) => {
    try {
      const result = await systemAgentCore.getUploadSpeed();
      console.log(`${result}`);
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });

  it('should get download speed', async(done) => {
    try {
      const result = await systemAgentCore.getDownloadSpeed();
      console.log(`download speed: ${result} Kbps`);

      done();
    } catch (e) {
      done(e);
    }
  });

  it('should call back network speed', (done) => {
    systemAgentCore.getSpeed('172.217.25.99', (result) => {
      console.log('network: \n', result);

      try {
        result.should.has.keys('download', 'upload', 'clientIP', 'ping', 'downloadError', 'uploadError');
        done();
      } catch (e) {
        done(e);
      }
    });
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

  it.skip('call teamview', async(done) => {
    try {
      const teamviewPath = `${__dirname}/../assets/osx/TeamViewerQS.app`;
      const result = await systemAgentCore.callTeamview({
        teamviewPath,
      });
      result.success.should.be.equal(true);
      done();
    } catch (e) {
      done(e);
    }
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
});
