import {exec} from 'child-process-promise';

export default class systemAgentCore{

  constructor({ostype}) {
    // ostype: OSX, WINDOWS
    this.OSTYPE = ostype;
  }

  greet() {
    return 'hello';
  }

  async getOSInfo() {
    try {

      let getOSSoftwareData = async () => {
        let cmd = '';
        if(this.OSTYPE === 'OSX') cmd = 'system_profiler SPSoftwareDataType';
        else return ''
        let result = await exec(cmd);
        return result.stdout;
      }

      let result = {
        OSSoftwareData: await getOSSoftwareData()
      }

      return result;
    } catch (e) {
      throw e;
    }
  }

  async getSoftwareInfo() {
    try {

      let getSafariVersion = async () => {
        let cmd = '';
        if(this.OSTYPE === 'OSX') cmd = 'defaults read /Applications/Safari.app/Contents/version CFBundleShortVersionString';
        else return ''

        let result = await exec(cmd);
        return result.stdout;
      }

      let getChromeVersion = async () => {
        let cmd = '';
        if(this.OSTYPE === 'OSX') cmd = '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version';
        else return ''

        let result = await exec(cmd);
        return result.stdout;
      }

      let getFlashVersion = async () => {
        let cmd = '';
        if(this.OSTYPE === 'OSX') cmd = 'defaults read /Library/Internet\\ Plug-Ins/Flash\\ Player.plugin/Contents/version.plist CFBundleVersion';
        if(this.OSTYPE === 'WINDOWS') cmd = 'REG QUERY HKEY_LOCAL_MACHINE\\Software\Macromedia\\flashplayer';
        else return ''

        let result = await exec(cmd);
        return result.stdout;
      }


      let result = {
        safari: await getSafariVersion(),
        chrome: await getChromeVersion(),
        flash: await getFlashVersion()
      }

      return result;
    } catch (e) {
      throw e;
    }
  }

  async getNetworkInfo() {
    try {

      let getNetworkSetup = async () => {
        let cmd = '';
        if(this.OSTYPE === 'OSX') cmd = 'networksetup -listallhardwareports';
        else return ''

        let result = await exec(cmd);
        return result.stdout;
      }

      let result = {
        networkSetup: await getNetworkSetup()
      }

      return result;
    } catch (e) {
      throw e;
    }
  }

}
