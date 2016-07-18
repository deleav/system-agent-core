import axios from 'axios';
import config from '../config';
export async function getConfig() {
  try {
    // const result = await axios.get(`${config.domain}/config`);
    const result = await axios.get('https://s3-ap-northeast-1.amazonaws.com/s3.trunksys.com/systemagent/config.json');
    return result.data;
  } catch (e) {
    logger.error(e.message);
    return false;
  }
}
