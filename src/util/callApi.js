import axios from 'axios';
import config from '../config';
import FormData from 'form-data';
import fs from 'fs';
export async function callApi(option) {
  try {
    if (option.filePath) {
      const data = new FormData();
      let test = await fs.statSync(option.filePath);
      logger.info(test);
      data.append('', fs.createReadStream(option.filePath));
      option.data = data;
      option.headers = {
        ...option.headers,
        ...data.getHeaders()
      }
    }
    // console.log(option);
    const result = await axios(option);
    return result.data;
  } catch (e) {
    logger.error(e.data);
    return e.data;
  }
}
