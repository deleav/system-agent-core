
import SystemAgentCore from '../../src';
import os from 'os';

describe('systemAgentCore', () => {
  let systemAgentCore = null;
  beforeEach(function() {
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

      result.should.has.keys('safari', 'chrome', 'flash');


      done();
    } catch (e) {
      done(e);
    }
  });

  it('should get Network info', async (done) => {
    try {
      const result = await systemAgentCore.getNetworkInfo();

      console.log(result);

      result.should.has.keys('networkSetup');


      done();
    } catch (e) {
      done(e);
    }
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
});
