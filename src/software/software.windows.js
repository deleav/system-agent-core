
import { exec } from 'child-process-promise';

export async function getOSInfo() {
  try {
    const getOSSoftwareData = async () => {
      let cmd = '';
      // only system ver
      cmd = 'ver';
      // system name & version
      cmd = 'systeminfo | findstr /B /C:"OS Name" /C:"OS Version" /C:"作業系統名稱" /C:"作業系統版本"';
      const result = await exec(cmd);
      return result.stdout;
    };

    const result = {
      OSSoftwareData: await getOSSoftwareData(),
    };

    return result;
  } catch (e) {
    throw e;
  }
}

export async function getSoftwareInfo() {
  try {
    const getSafariVersion = async () => {
      let cmd = '';
      if (this.OSTYPE === 'OSX') {
        cmd = 'defaults read /Applications/Safari.app/Contents/version CFBundleShortVersionString';
      } else {
        return '';
      }
      const result = await exec(cmd);
      return result.stdout;
    };

    const getChromeVersion = async () => {
      let cmd = '';
      if (this.OSTYPE === 'OSX') {
        cmd = '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version';
      } else {
        return '';
      }
      const result = await exec(cmd);
      return result.stdout;
    };

    const getFlashVersion = async () => {
      let cmd = '';
      if (this.OSTYPE === 'WINDOWS') {
        cmd = 'REG QUERY HKEY_LOCAL_MACHINE\\Software\\Macromedia\\flashplayer';
      } else {
        return '';
      }

      const result = await exec(cmd);
      return result.stdout;
    };


    const result = {
      safari: await getSafariVersion(),
      chrome: await getChromeVersion(),
      flash: await getFlashVersion(),
    };

    return result;
  } catch (e) {
    throw e;
  }
}


export async function callTeamview({ teamviewPath }) {
    try {
      let cmd = '';
      cmd = `${teamviewPath} --args -AppCommandLineArg`;
      console.log('=== cmd ===', cmd);
      let execResult = await exec(cmd);

      console.log('=== result ===', execResult);


      let result = {
        success: true
      }

      return result;
    } catch (e) {
      throw e;
    }
  }
