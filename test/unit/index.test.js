
import SystemAgentCore from '../../src';

describe('systemAgentCore use OSX', () => {

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

    try {
      let result = await systemAgentCore.getNetworkInfo();

      console.log(result);

      result.should.has.keys('networkSetup');


      done();
    } catch (e) {
      done(e);
    }
  });

  describe('systemAgentCore use WINDOWS', () => {

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

    it.only('should get Browser info', async (done) => {

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
  });

});
