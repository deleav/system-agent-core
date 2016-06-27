import axios from 'axios';
import config from '../config';
export async function exportReport(json) {
  try {
    await axios.post(`${config.domain}/report`, json);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
