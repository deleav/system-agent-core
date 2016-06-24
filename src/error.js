export function getMessage(type) {
  switch (type) {
    case 'ERROR_NETWORK_UPLOAD':
      return 'uploading error, please change another internet enviroment.';
    case 'ERROR_NETWORK_DOWNLOAD':
      return 'downloading error, please change another internet enviroment.';
    default:
      return 'error';
  }
}
