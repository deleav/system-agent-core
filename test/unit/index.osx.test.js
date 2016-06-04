import SystemAgentCore from '../../src';


describe.only('systemAgentCore use OSX', () => {

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

  it.only('should get Network info', (done) => {
    // this.timeout(10000);
    const result = systemAgentCore.getNetworkInfo((result) => {
      console.log('test',result);
      try {
        result.should.has.keys('networkSetup');
        done();

      } catch (e) {
        done(e);
      }
    });

    result.should.has.keys('ping');
    result.should.has.keys('download');
    result.should.has.keys('upload');
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
