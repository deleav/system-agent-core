import SystemAgentCore from '../../src';
import os from 'os';
import { regex } from '../../src/util/regex';
import { exec } from 'child-process-promise';

describe.only('regex', () => {
  let systemAgentCore = null;
  const platform = os.type() === 'Darwin' ? 'OSX' : 'WINDOWS';
  beforeEach(() => {
    if (os.type() === 'Darwin') {
      // Darwin 是 node 上的 OSX 代號
      systemAgentCore = new SystemAgentCore({
        ostype: 'OSX',
      });
    } else {
      systemAgentCore = new SystemAgentCore({
        ostype: 'WINDOWS',
      });
    }
  });

  it('macOS hardware model', async(done) => {
    try {
      await regex('hardware', platform, 'model');
      done();
    } catch (e) {
      done(e);
    }
  });

  it('macOS hardware cpu', async(done) => {
    try {
      await regex('hardware', platform, 'cpu');
      done();
    } catch (e) {
      done(e);
    }
  });

  it('macOS hardware ram', async(done) => {
    try {
      await regex('hardware', platform, 'ram');
      done();
    } catch (e) {
      done(e);
    }
  });

  it('macOS hardware network', async(done) => {
    try {
      await regex('hardware', platform, 'network');
      done();
    } catch (e) {
      done(e);
    }
  });

  it('macOS software safari', async(done) => {
    try {
      await regex('software', platform, 'safari');
      done();
    } catch (e) {
      done(e);
    }
  });

  it('macOS software chrome', async(done) => {
    try {
      await regex('software', platform, 'chrome');
      done();
    } catch (e) {
      done(e);
    }
  });

  it('macOS software flash', async(done) => {
    try {
      await regex('software', platform, 'flash');
      done();
    } catch (e) {
      done(e);
    }
  });

  it('macOS software ie', async(done) => {
    try {
      await regex('software', platform, 'ie');
      done();
    } catch (e) {
      done(e);
    }
  });
  it('macOS software firefox', async(done) => {
    try {
      await regex('software', platform, 'firefox');
      done();
    } catch (e) {
      done(e);
    }
  });
  it('macOS software browser360', async(done) => {
    try {
      await regex('software', platform, 'browser360');
      done();
    } catch (e) {
      done(e);
    }
  });
});
