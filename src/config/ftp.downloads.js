import ftp from './ftp';

const downloads = {
  host: ftp.host,
  user: ftp.user,
  pwd: ftp.pwd,
  target: 'downloads/test10MB',
};

export default downloads;
