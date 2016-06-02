import * as lib from './network';

export function getPingByRemoteHost(host, cb) {
  lib.getPingByRemoteHost(host, cb);
}

export async function getUploadSpeed() {
  return lib.getUploadSpeed();
}

export async function getDownloadSpeed() {
  return lib.getDownloadSpeed();
}
