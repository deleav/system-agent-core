import ftp from './ftp';

const uploads = {
  ...ftp,
  src: 'test10MB',
  dest: 'uploads/test10MB',
  folder: 'uploads',
};

export default uploads;
