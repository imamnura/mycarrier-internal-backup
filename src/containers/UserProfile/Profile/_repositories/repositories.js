import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getDetailProfile = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/users-management/v2/profile-mycarrier',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
