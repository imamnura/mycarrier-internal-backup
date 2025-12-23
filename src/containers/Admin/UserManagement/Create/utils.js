import { route } from '@configs/';

export const breadcrumb = (userId) => {
  if (userId) {
    return [
      { label: 'User Management', url: route.user('list') },
      { label: userId, url: route.user('detail', userId) },
      { label: 'Edit User' },
    ];
  }
  return [
    { label: 'User Management', url: route.user('list') },
    { label: 'Add User' },
  ];
};
