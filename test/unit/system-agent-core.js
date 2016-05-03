import SystemAgentCore from '../../src/system-agent-core';

describe('systemAgentCore', () => {
  describe('Greet function', () => {
    let systemAgentCore = null;
    beforeEach(() => {
      systemAgentCore = new SystemAgentCore({ostype: 'OSX'});
    });

    it('should have always returned hello', () => {

      let result = systemAgentCore.greet();
      expect(result).to.equals('hello');

    });

    it('should get OS info', async function(done) {

      try {
        let result = await systemAgentCore.getOSInfo();
        console.log('=== result.stdout ===', result.stdout);

        let findExpectString = result.stdout.indexOf('System Software Overview') >= 0;
        findExpectString.should.be.true;

        done();
      } catch (e) {
        done(e);
      }

    });

  });
});
