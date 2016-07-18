import SystemAgentCore from '../../src';
import apiConfig from '../../src/config/api';
import os from 'os';
import fs from 'fs';

describe('systemAgentCore api', () => {
  let systemAgentCore = null;
  beforeEach(() => {
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
  });

  it('should get config', async(done) => {
    try {
      const result = await systemAgentCore.callApi('config');
      console.log(result);
      result.should.has.keys('ad', 'testServer', 'report', 'uploadApi', 'debug');
      done();
    } catch (e) {
      done(e);
    }
  });

  it('should upload', async(done) => {
    try {
      const result = await systemAgentCore.callApi('uploadFile');
      result.should.has.keys('FileURL', 'ErrMsg');
      (result.ErrMsg === null).should.be.a.true;
      done();
    } catch (e) {
      done(e);
    }
  });

  it('should post config', async(done) => {
    try {
      const data = {
        email: 'test@gmail.com',
        audio: 'http://XXXXXX/PMIT/20160711/Email_yyyyMMDDmmss.wav',
        video: 'http://XXXXXX/PMIT/20160711/Email_yyyyMMDDmmss.webm',
        cpuBenchmark: '7.68',
        network: {
          ip: '127.0.0.1',
          ping: '20',
          upload: '10',
          download: '20',
          traceRoute: 'traceRoutetraceRoutetraceRoutetraceRoute',
        },
        cpu: 'Intel(R) Core(TM) i5-5250U CPU @ 1.60GHz',
        model: 'MacBookAir7,2',
        modelVersion: 'OS X El Capitan 10.11.3',
        ram: {
          size: '4 GB',
          speed: '1600 MHz',
          status: 'OK',
          type: 'DDR3',
        },
        networkInterface: {
          device: 'bridge0',
          ethernetAddress: 'e2:ac:cb:b9:85:00',
          hardware: 'Thunderbolt Bridge',
          enable: false,
        },
        software: {
          china360: 'notFound',
          chrome: '51.0.2704.103',
          firefox: '44.0.2',
          flash: 'notFound',
          ie: 'notFound',
          safari: '9.1.1',
          opera: 'notFound',
        },
      };
      const result = await systemAgentCore.callApi('report', {data});
      console.log(result);
      done();
    } catch (e) {
      done(e);
    }
  });

    describe('upload download', () => {
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
          console.log(e);
          done(e)
        }
      });

      it('testServer upload', async(done) => {
        try {
          const testServer = config.testServer[0];

          const startTime = Math.floor(new Date().getTime());
          const result = await systemAgentCore.callApi('upload', {
            url: testServer.uploadTest,
            filePath: 'test10MB',
          });
          result.should.be.equal('File Upload Test End');

          const doneTime = Math.floor(new Date().getTime());
          console.log("!!!",result, 1048576 / (doneTime - startTime) * 1000 / 1024 / 1024 * 8);
          done();
        } catch (e) {
          done(e);
        }
      });

      it('testServer download', async(done) => {
        try {
          const startTime = Math.floor(new Date().getTime());
          const testServer = config.testServer[0];
          const result = await systemAgentCore.callApi('download', {
            url: testServer.downloadTest,
          });
          const doneTime = Math.floor(new Date().getTime());
          console.log("!!!", 2011165 / (doneTime - startTime) * 1000 / 1024 / 1024 * 8);
          await fs.writeFileSync(`Download_Test.jpg`, result);
          done();
        } catch (e) {
          done(e);
        }
      });
    });

});
