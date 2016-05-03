import systemAgentCore from '../../src/system-agent-core';

describe('systemAgentCore', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(systemAgentCore, 'greet');
      systemAgentCore.greet();
    });

    it('should have been run once', () => {
      expect(systemAgentCore.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(systemAgentCore.greet).to.have.always.returned('hello');
    });
  });
});
