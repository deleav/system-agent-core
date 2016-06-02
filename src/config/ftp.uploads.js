import ftp from './ftp';

const uploads = {
  host: ftp.host,
  user: ftp.user,
  pwd: ftp.pwd,
  src: 'test10MB',
  dest: 'uploads/test10MB',
};

export default uploads;
