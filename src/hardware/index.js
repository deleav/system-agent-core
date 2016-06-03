import * as osx from './hardware.osx.js';
import * as windows from './hardware.windows.js';
import * as hardware from './hardware.js';

export default {
  OSX: { ...osx, ...hardware },
  WINDOWS: { ...windows, ...hardware },
};
