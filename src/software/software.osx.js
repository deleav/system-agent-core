import { exec } from 'child-process-promise';

export async function getOSInfo() {
  try {
    const getOSSoftwareData = async () => {
      let cmd = '';
      cmd = 'system_profiler SPSoftwareDataType';
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
      cmd = 'defaults read /Applications/Safari.app/Contents/version CFBundleShortVersionString';
      const result = await exec(cmd);
      return result.stdout;
    };

    const getChromeVersion = async () => {
      try {
        let cmd = '';
        cmd = '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version';
        const result = await exec(cmd);
        return result.stdout;
      } catch (e) {
        return null;
      }
    };

    const getFlashVersion = async () => {
      try {
        let cmd = '';
        cmd = 'defaults read /Library/Internet\\ Plug-Ins/Flash\\ Player.plugin/Contents/version.plist CFBundleVersion';
        const result = await exec(cmd);
        return result.stdout;
      } catch (e) {
        return '未偵測到';
      }
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
    const cmd = `open -n ${teamviewPath} --args -AppCommandLineArg`;
    await exec(cmd);
    const result = {
      success: true,
    };
    return result;
  } catch (e) {
    throw e;
  }
}
