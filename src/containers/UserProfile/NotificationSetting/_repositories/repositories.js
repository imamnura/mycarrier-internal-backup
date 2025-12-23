import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListNotification = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/notification',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const putUpdateNotification = (data) => {
  const options = {
    method: 'PUT',
    data: data,
    url: `/activation/internal/notification`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
