import { getServerByPost } from '@/utils/getServeData';

export async function login(data) {
  return await getServerByPost(`/op/api/v1/user/login`, data);
}


