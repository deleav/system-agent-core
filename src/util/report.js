import axios from 'axios';
import config from '../config';
export async function sendReport(json) {
  try {
    await axios.post(`${config.domain}/report`, json);
    return true;
  } catch (e) {
    logger.error(e.message);
    return false;
  }
}
