import { getServerByGet } from '@/utils/getServeData';

export async function getCurrent(data) {
  return await getServerByGet(`/op/api/v1/user/info`, data);
}
