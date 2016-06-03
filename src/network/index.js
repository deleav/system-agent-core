import * as osx from './network.osx.js';
import * as windows from './network.windows.js';
import * as network from './network.js';

export default {
  OSX: { ...osx, ...network },
  WINDOWS: { ...windows, ...network },
};
