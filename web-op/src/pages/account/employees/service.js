import {
  getServerByPost,
  getServerByGet,
  getServerByPut,
  getServerBydelete,
} from '@/utils/getServeData';

export async function getuserList(data) {
  return await getServerByGet('/op/api/v1/user/list', data);
}

export async function addUser(data) {
  return await getServerByPost('/op/api/v1/user/add', data);
}

export async function getUserInfo(data) {
  return await getServerByGet('/op/api/v1/user/info', data);
}

export async function updataUser(data) {
  return await getServerByPut('/op/api/v1/user/update', data);
}
