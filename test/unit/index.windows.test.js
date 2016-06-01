import os from 'os';
import SystemAgentCore from '../../src';

describe('systemAgentCore use Windows', () => {

  let systemAgentCore = null;
  before(function() {
    // Windows_NT 是 node 上的 Windows 代號
    if (os.type() !== 'Windows_NT') {
      this.skip();
    }
  });

  beforeEach(function() {
    systemAgentCore = new SystemAgentCore({ostype: 'WINDOWS'});
    if (os.type() !== 'Windows_NT') this.skip();
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

    try {
      let result = await systemAgentCore.getNetworkInfo();

      console.log(result);

      result.should.has.keys('networkSetup');


      done();
    } catch (e) {
      done(e);
    }
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
