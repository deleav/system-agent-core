import SystemAgentCore from '../../src';
import os from 'os';

describe('systemAgentCore', () => {
  let systemAgentCore = null;
  beforeEach(() => {
    if (os.type() === 'Darwin') {
      // Darwin 是 node 上的 OSX 代號
      systemAgentCore = new SystemAgentCore({ ostype: 'OSX' });
    } else {
      systemAgentCore = new SystemAgentCore({ ostype: 'WINDOWS' });
    }
  });

  it('should get OS info', async (done) => {
    try {
      const result = await systemAgentCore.getOSInfo();
      result.should.has.keys('OSSoftwareData');

      done();
    } catch (e) {
      done(e);
    }
  });

  it('should get Browser info', async (done) => {
    try {
      const result = await systemAgentCore.getSoftwareInfo();
      console.log(result);
      result.should.has.keys('safari', 'chrome', 'flash', 'ie', 'firefox', '360');

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

  it('should get upload speed', async (done) => {
    try {
      const result = await systemAgentCore.getUploadSpeed();
      console.log(`upload speed: ${result} Kbps`);

      done();
    } catch (e) {
      done(e);
    }
  });

  it('should get download speed', async (done) => {
    try {
      const result = await systemAgentCore.getDownloadSpeed();
      console.log(`download speed: ${result} Kbps`);

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

  it.skip('call teamview', async (done) => {
    try {
      const teamviewPath = `${__dirname}/../assets/osx/TeamViewerQS.app`;
      const result = await systemAgentCore.callTeamview({ teamviewPath });
      result.success.should.be.equal(true);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('get osx hardware info', async (done) => {
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

  it.only('get getCpuBenchmark', (done) => {
    try {
      const result = systemAgentCore.getCpuBenchmark(echo);
      done();
    } catch (e) {
      done(e);
    }
  });
});
