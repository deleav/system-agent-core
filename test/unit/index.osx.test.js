import SystemAgentCore from '../../src';

describe('systemAgentCore use OSX', () => {

  let systemAgentCore = null;
  beforeEach(() => {
    systemAgentCore = new SystemAgentCore({ ostype: 'OSX' });
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
      result.should.has.keys('safari', 'chrome', 'flash');

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

  it.skip('call teamview', async (done) => {
    try {
      const teamviewPath = __dirname+'/../assets/osx/TeamViewerQS.app'
      const result = await systemAgentCore.callTeamview({teamviewPath});

      done();
    } catch (e) {
      done(e);
    }
  });

  it('get osx hardware info', async (done) => {
    try {
      const result = await systemAgentCore.getHardwareInfo();
      console.log(result);

      done();
    } catch (e) {
      done(e);
    }
  });
});
