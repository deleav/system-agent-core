
import SystemAgentCore from '../../src';

describe.only('systemAgentCore use OSX', () => {

  let systemAgentCore = null;
  beforeEach(() => {
    systemAgentCore = new SystemAgentCore({ostype: 'OSX'});
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
    // this.timeout(10000);
    try {
      let result ='aaa';// await systemAgentCore.getNetworkInfo();

      console.log('test',result);

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
