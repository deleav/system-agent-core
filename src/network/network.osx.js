export async function getNetworkInfo() {
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
