import networkService from './network';
module.exports = {
  OSX: {
    hardware: {
      model: [{
        cmd: 'system_profiler SPHardwareDataType',
        regex: 'Model Identifier: (.*)\n',
      }],
      cpu: [{
        cmd: 'sysctl -n machdep.cpu.brand_string',
        regex: '^(.*)\n$',
      }],
      ram: [{
        cmd: 'system_profiler SPHardwareDataType',
        regex: 'Memory: (.*) GB\n',
      }],
      network: [{
        method: networkService.OSX.getNetworkHardwareInfo(),
      }],
    },
    software: {
      safari: [{
        cmd: 'defaults read /Applications/Safari.app/Contents/version CFBundleShortVersionString',
        regex: '^(.*)\n$',
        default: 'notFound',
      }],
      chrome: [{
        cmd: '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version',
        regex: '^Google Chrome (.*)\n$',
        default: 'notFound',
      }],
      flash: [{
        cmd: 'defaults read /Library/Internet\\ Plug-Ins/Flash\\ Player.plugin/Contents/version.plist CFBundleVersion',
        regex: '^(.*)\n$',
        default: 'notFound',
      }],
      ie: [{
        cmd: '',
        regex: '',
        default: null,
      }],
      firefox: [{
        cmd: '/Applications/Firefox.app/Contents/MacOS/firefox -version',
        regex: '^Mozilla Firefox (.*)\n$',
        default: 'notFound',
      }],
      browser360: [{
        cmd: '',
        regex: '',
        default: null,
      }],
    },
  },
  WINDOWS: {
    hardware: {
      model: [{
        cmd: 'wmic os get caption',
        regex: '\n(.*)',
      }],
      cpu: [{
        cmd: 'wmic cpu get name',
        regex: '\n(.*)',
      }],
      ram: [{
        cmd: '',
        regex: '',
      }],
      network: [{
        method: networkService.WINDOWS.getNetworkHardwareInfo(),
      }],
    },
    software: {
      safari: [{
        cmd: '',
        regex: '',
        default: null,
      }],
      chrome: [{
        cmd: 'REG QUERY HKEY_LOCAL_MACHINE\\Software\\Wow6432Node\\Google\\Update\\Clients\\{8A69D345-D564-463c-AFF1-A69D9E530F96} /t REG_SZ /f .',
        regex: 'REG_SZ\s(.*)\r\n',
        default: 'notFound',
      }],
      flash: [{
        cmd: 'REG QUERY HKEY_LOCAL_MACHINE\Software\Macromedia\flashplayer /v CurrentVersion',
        regex: 'REG_SZ\s(.*)\r\n',
        default: 'notFound',
      }],
      ie: [{
        cmd: 'REG QUERY "HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Internet Explorer" /v version',
        regex: 'REG_SZ\s(.*)\r\n',
        default: 'notFound',
      }],
      firefox: [{
        cmd: 'reg query "HKEY_LOCAL_MACHINE\\Software\\Mozilla\\Mozilla Firefox" /v CurrentVersion',
        regex: 'REG_SZ\s(.*)\r\n',
        default: 'notFound',
      }],
      browser360: [{
        cmd: 'reg query "HKEY_CURRENT_USER\\Software\\360\\360se6\\Update\\clients\\{02E720BD-2B50-4404-947C-65DBE64F6970}" /v pv',
        regex: 'REG_SZ\s(.*)\r\n',
        default: 'notFound',
      }],
    },
  },
};
