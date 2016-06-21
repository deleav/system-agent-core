import { exec } from 'child-process-promise';
import ifconfig from 'ifconfig';


export async function getNetworkHardwareInfo() {
  const cmd = 'networksetup -listallhardwareports';
  const result = await exec(cmd);
  const objRE = new RegExp('Hardware Port: (.*)\n.*Device: (.*)\n.*Ethernet Address: (.*)\n', 'g');
  let match;
  let matchArray = [];
  while ((match = objRE.exec(result.stdout)) !== null) {
    if (match.index === objRE.lastIndex) {
      objRE.lastIndex++;
    }
    matchArray.push({
      hardware: match[1],
      device: match[2],
      ethernetAddress: match[3],
      enable: false,
    });
  }
  const ifconfigJson = await new Promise((done) => {
    ifconfig((err, results) => {
      if (err) {
        console.log("ERROR: %s\n%s", err, results);
      }
      done(results);
    });
  });

  Object.keys(ifconfigJson).forEach((key) => {
    matchArray.forEach((item, i) => {
      if (ifconfigJson[key].status && ifconfigJson[key].ether === item.ethernetAddress) {
        matchArray[i].enable = ifconfigJson[key].status === 'active';
      }
    });
  });
  return matchArray;
}

export async function getNetworkInfo() {
  try {
    const result = {
      networkSetup: await getNetworkHardwareInfo(),
    };
    return result;
  } catch (e) {
    throw e;
  }
}
