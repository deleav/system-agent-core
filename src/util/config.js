import axios from 'axios';
import config from '../config';
export async function getConfig() {
  try {
    const result = await axios.get(`${config.domain}/config`);
    return result.data;
  } catch (e) {
    console.log(e);
    return false;
  }
}
