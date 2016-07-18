import { exec } from 'child-process-promise';

export async function getOSInfo() {
  try {
    const getOSSoftwareData = async () => {
      let cmd = '';
      // only get system ver
      // cmd = 'ver';
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
    logger.error(e.message);
    throw e;
  }
}

export async function getSoftwareInfo() {
  try {
    const getChromeVersion = async () => {
      try {
        const cmd = 'REG QUERY HKEY_LOCAL_MACHINE\\Software\\Wow6432Node\\Google\\Update\\Clients\\{8A69D345-D564-463c-AFF1-A69D9E530F96}';
        // let regQuery = {
        //   stdout: '\r\nHKEY_LOCAL_MACHINE\\Software\\Wow6432Node\\Google\\Update\\Clients\\{8A69D345-D564-463c-AFF1-A69D9E530F96}\r\n    name    REG_SZ    Google Chrome\r\n    oopcrashes    REG_DWORD    0x1\r\n    pv    REG_SZ    50.0.2661.102\r\n\r\nHKEY_LOCAL_MACHINE\\Software\\Wow6432Node\\Google\\Update\\Clients\\{8A69D345-D564-463c-AFF1-A69D9E530F96}\\Commands\r\n'
        // };
        const regQuery = await exec(cmd);
        const str = regQuery.stdout;
        // get chrome version
        const objRE = new RegExp('\\d*\\.\\d*\\.\\d*\\.\\d*', 'g');
        const match = str.match(objRE);
        const result = match[0];
        return result;
      } catch (e) {
        logger.error(e.message);
        return 'notFound';
      }
    };

    const getFlashVersion = async () => {
      try {
        const cmd = 'REG QUERY HKEY_LOCAL_MACHINE\\Software\\Macromedia\\flashplayer';
        const regQuery = await exec(cmd);
        const str = regQuery.stdout;
        // get flash version
        const objRE = new RegExp('\\d*\\,\\d*\\,\\d*\\,\\d*', 'g');
        const match = str.match(objRE);
        const result = match[0];
        return result;
      } catch (e) {
        logger.error(e.message);
        return 'notFound';
      }
    };

    const getIEVersion = async () => {
      const cmd = ' reg query "HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Internet Explorer" /v version | findstr \"version\"';
      const regQuery = await exec(cmd);
      const str = regQuery.stdout;
      const objRE = new RegExp('\\d*\\.\\d*\\.\\d*\\.\\d*', 'g');
      const match = str.match(objRE);
      const result = match[0];
      return result;
    };

    const getOperaVersion = async () => {
      try {
        const cmd = 'REG QUERY HKEY_LOCAL_MACHINE\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall | findstr Opera';
        const regQuery = await exec(cmd);
        const str = regQuery.stdout;
        const objRE = new RegExp('Opera (.*)');
        const match = str.match(objRE);
        const result = match[1];
        return result;
      } catch (e) {
        logger.error(e.message);
        return 'notFound';
      }
    };

    const getFireFoxVersion = async () => {
      try {
        const cmd = ' reg query "HKEY_LOCAL_MACHINE\\Software\\Mozilla\\Mozilla Firefox" /v CurrentVersion';
        const regQuery = await exec(cmd);
        const str = regQuery.stdout;
        const objRE = new RegExp('\\d*\\.\\d*\\.\\d*', 'g');
        const match = str.match(objRE);
        const result = match[0];
        return result;
      } catch (e) {
        logger.error(e.message);
        return 'notFound';
      }
    };

    const get360Version = async () => {
      try {
        const cmd = ' reg query "HKEY_CURRENT_USER\\Software\\360\\360se6\\Update\\clients\\{02E720BD-2B50-4404-947C-65DBE64F6970}" /v pv';
        const regQuery = await exec(cmd);
        const str = regQuery.stdout;
        const objRE = new RegExp('\\d*\\.\\d*\\.\\d*\\.\\d*', 'g');
        const match = str.match(objRE);
        const result = match[0];
        return result;
      } catch (e) {
        logger.error(e.message);
        return 'notFound';
      }
    };

    const result = {
      safari: null,
      chrome: await getChromeVersion(),
      flash: await getFlashVersion(),
      ie: await getIEVersion(),
      firefox: await getFireFoxVersion(),
      browser360: await get360Version(),
      opera: await getOperaVersion(),
    };

    return result;
  } catch (e) {
    logger.error(e.message);
    throw e;
  }
}


export async function callTeamview({ teamviewPath }) {
  try {
    let cmd = '';
    cmd = `${teamviewPath} --args -AppCommandLineArg`;
    await exec(cmd);

    const result = {
      success: true,
    };

    return result;
  } catch (e) {
    logger.error(e.message);
    throw e;
  }
}
