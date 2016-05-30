export async function getOSInfo() {
  try {

    let getOSSoftwareData = async () => {
      let cmd = '';
      if (this.OSTYPE === 'OSX') cmd = 'system_profiler SPSoftwareDataType';
      else if (this.OSTYPE === 'WINDOWS') {
        // only system ver
        cmd = 'ver';
        // system name & version
        cmd = 'systeminfo | findstr /B /C:"OS Name" /C:"OS Version" /C:"作業系統名稱" /C:"作業系統版本"';
      }
      else return '';
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

export async function getSoftwareInfo() {
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
      let result ;
      if(this.OSTYPE === 'OSX') {
        cmd = '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version';
        result = await exec(cmd);
      } else if (this.OSTYPE === 'WINDOWS') {
        cmd = 'REG QUERY HKEY_LOCAL_MACHINE\\Software\\Wow6432Node\\Google\\Update\\Clients\\{8A69D345-D564-463c-AFF1-A69D9E530F96}';
        // return string
        // let regQuery = {
        //   stdout: '\r\nHKEY_LOCAL_MACHINE\\Software\\Wow6432Node\\Google\\Update\\Clients\\{8A69D345-D564-463c-AFF1-A69D9E530F96}\r\n    name    REG_SZ    Google Chrome\r\n    oopcrashes    REG_DWORD    0x1\r\n    pv    REG_SZ    50.0.2661.102\r\n\r\nHKEY_LOCAL_MACHINE\\Software\\Wow6432Node\\Google\\Update\\Clients\\{8A69D345-D564-463c-AFF1-A69D9E530F96}\\Commands\r\n'
        // };
        let regQuery = await exec(cmd);
        const str = regQuery.stdout;
        // get chrome version
        const objRE = new RegExp('\\d*\\.\\d*\\.\\d*\\.\\d*', 'g');
        const match = str.match(objRE);
        result = {
          stdout: `Google Chrome ${match[0]}`,
        };
      } else return ''
      return result.stdout;
    }

    let getFlashVersion = async () => {
      let cmd = '';
      let result ;
      if(this.OSTYPE === 'OSX') {
        cmd = 'defaults read /Library/Internet\\ Plug-Ins/Flash\\ Player.plugin/Contents/version.plist CFBundleVersion';
        result = await exec(cmd)
      } else if(this.OSTYPE === 'WINDOWS') {
        cmd = 'REG QUERY HKEY_LOCAL_MACHINE\\Software\\Macromedia\\flashplayer';
        const str = regQuery.stdout;
        // get flash version
        const objRE = new RegExp('\\d*\\,\\d*\\,\\d*\\,\\d*', 'g');
        const match = str.match(objRE);
        result = {
          stdout: `Flash ${match[0]}`,
        };
      } else return '';

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


export async function callTeamview({teamviewPath}) {
    try {

      console.log('=== this.OSTYPE ===', this.OSTYPE);
      let cmd = '';
      if(this.OSTYPE === 'OSX') cmd = `open -n ${teamviewPath} --args -AppCommandLineArg`;
      else if(this.OSTYPE === 'WINDOWS') cmd = `${teamviewPath} --args -AppCommandLineArg`;
      else return ''
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
