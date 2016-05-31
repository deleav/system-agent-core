
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
    throw e;
  }
}

export async function getSoftwareInfo() {
  try {
    const getChromeVersion = async () => {
      const cmd = 'REG QUERY HKEY_LOCAL_MACHINE\\Software\\Wow6432Node\\Google\\Update\\Clients\\{8A69D345-D564-463c-AFF1-A69D9E530F96}';
      // let regQuery = {
      //   stdout: '\r\nHKEY_LOCAL_MACHINE\\Software\\Wow6432Node\\Google\\Update\\Clients\\{8A69D345-D564-463c-AFF1-A69D9E530F96}\r\n    name    REG_SZ    Google Chrome\r\n    oopcrashes    REG_DWORD    0x1\r\n    pv    REG_SZ    50.0.2661.102\r\n\r\nHKEY_LOCAL_MACHINE\\Software\\Wow6432Node\\Google\\Update\\Clients\\{8A69D345-D564-463c-AFF1-A69D9E530F96}\\Commands\r\n'
      // };
      const regQuery = await exec(cmd);
      const str = regQuery.stdout;
      // get chrome version
      const objRE = new RegExp('\\d*\\.\\d*\\.\\d*\\.\\d*', 'g');
      const match = str.match(objRE);
      const result = `Google Chrome ${match[0]}`;
      return result;
    };

    const getFlashVersion = async () => {
      const cmd = 'REG QUERY HKEY_LOCAL_MACHINE\\Software\\Macromedia\\flashplayer';
      const regQuery = await exec(cmd);
      const str = regQuery.stdout;
      // get flash version
      const objRE = new RegExp('\\d*\\,\\d*\\,\\d*\\,\\d*', 'g');
      const match = str.match(objRE);
      const result = `Flash ${match[0]}`;
      return result;
    };


    const result = {
      safari: '',
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
    const execResult = await exec(cmd);

    const result = {
      success: true,
    };

    return result;
  } catch (e) {
    throw e;
  }
}
