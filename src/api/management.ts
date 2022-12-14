import { mockRequest } from '../utils';
import { adapter } from '../utils/service';
import { adapterOfFetchUserList } from './management.adapter';

/**
 * 获取用户列表
 * @returns
 */
export const fetchUserList = async () => {
  const data = await mockRequest.post<ApiUserManagement.User[] | null>('/getAllUserlist');
  console.log('datafetch', data);

  return adapter(adapterOfFetchUserList, data);
};
