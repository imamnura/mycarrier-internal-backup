import { getAccessToken } from '@utils/common';
import fetch from '@utils/fetch';

export const getListNotification = (opt) => {
  let url = '/notifications/notification/v1/activate';

  // if (isRole('am')) {
  //   url = '/notifications/notification/v1/activation-letter';
  // }

  const options = {
    ...opt,
    url,
    method: 'GET',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const clickNotificationBell = () => {
  const options = {
    method: 'PUT',
    url: '/notifications/notification/v1/activate/click',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const readNotification = (id) => {
  const options = {
    method: 'PUT',
    url: `/notifications/notification/v1/${id}/read`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
