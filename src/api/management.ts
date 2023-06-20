import { mockRequest } from '../utils';
import { adapter } from '../utils/service';
import { adapterOfFetchUserList } from './management.adapter';

/**
 * 获取用户列表
 * @returns
 */
export const fetchUserList = async () => {
  const data = await mockRequest.post<ApiUserManagements.User[] | null>('/getAllUserlist');

  return adapter(adapterOfFetchUserList, data);
};
