import SystemAgentCore from '../../src/system-agent-core';

describe('systemAgentCore', () => {
  describe('Greet function', () => {
    let systemAgentCore = null;
    beforeEach(() => {
      systemAgentCore = new SystemAgentCore();
    });

    it('should have always returned hello', () => {

      let result = systemAgentCore.greet();
      expect(result).to.equals('hello');

    });
  });
});
