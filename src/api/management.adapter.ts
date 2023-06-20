export function adapterOfFetchUserList(data: ApiUserManagements.User[] | null): UserManagement.User[] {
  if (!data) return [];

  return data.map((item, index) => {
    const user: UserManagement.User = {
      index: index + 1,
      key: item.id,
      ...item
    };
    return user;
  });
}
