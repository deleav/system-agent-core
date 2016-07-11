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
    logger.error(e);
    throw e;
  }
}

export async function getSoftwareInfo() {
  try {
    const getSafariVersion = async () => {
      let cmd = '';
      cmd = 'defaults read /Applications/Safari.app/Contents/version CFBundleShortVersionString';
      const cmdResult = await exec(cmd);
      const str = cmdResult.stdout.replace('\n', '');
      return str;
    };

    const getChromeVersion = async () => {
      try {
        let cmd = '';
        cmd = '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version';
        const cmdResult = await exec(cmd);
        const str = cmdResult.stdout;
        return str.replace('Google Chrome ', '').replace('\n', '').trim();
      } catch (e) {
        logger.error(e);
        return 'notFound';
      }
    };

    const getFlashVersion = async () => {
      try {
        let cmd = '';
        cmd = 'defaults read /Library/Internet\\ Plug-Ins/Flash\\ Player.plugin/Contents/version.plist CFBundleVersion';
        const cmdResult = await exec(cmd);
        const str = cmdResult.stdout.replace('\n', '');
        return str;
      } catch (e) {
        logger.error(e);
        return 'notFound';
      }
    };

    const getFirfoxVersion = async () => {
      try {
        let cmd = '';
        cmd = '/Applications/Firefox.app/Contents/MacOS/firefox -version';
        const cmdResult = await exec(cmd);
        const str = cmdResult.stdout;
        return str.replace('Mozilla Firefox ', '').replace('\n', '').trim();
      } catch (e) {
        logger.error(e);
        return 'notFound';
      }
    };


    const result = {
      safari: await getSafariVersion(),
      chrome: await getChromeVersion(),
      flash: await getFlashVersion(),
      ie: null,
      firefox: await getFirfoxVersion(),
      360: null,
    };

    return result;
  } catch (e) {
    logger.error(e);
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
    logger.error(e);
    throw e;
  }
}
