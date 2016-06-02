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

  it('should get Network info', async (done) => {
    systemAgentCore.getPingByRemoteHost('172.217.25.99', (result) => {
      console.log(`ping: ${result}`);

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
