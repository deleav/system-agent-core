import SystemAgentCore from '../../src';

describe('systemAgentCore use Windows', () => {
  let systemAgentCore = null;
  beforeEach(() => {
    systemAgentCore = new SystemAgentCore({ostype: 'WINDOWS'});
  });

  it('should get OS info', async (done) => {
    try {
      let result = await systemAgentCore.getOSInfo();
      result.should.has.keys('OSSoftwareData');

      done();
    } catch (e) {
      done(e);
    }
  });

  it('should get Browser info', async (done) => {
    try {
      let result = await systemAgentCore.getSoftwareInfo();
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

  it.only('should trace route', (done) => {
    systemAgentCore.traceRoute('172.217.25.99', 30, (result) => {
      console.log(`done trace route: ${result}`);

      try {
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it.skip('call teamview', async (done) => {
    try {
      let teamviewPath = __dirname+'/../assets/osx/TeamViewerQS.app'
      let result = await systemAgentCore.callTeamview({teamviewPath});

      done();
    } catch (e) {
      done(e);
    }
  });
});
