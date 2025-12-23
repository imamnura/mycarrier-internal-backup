import { getAccessToken } from '@utils/common';
import fetch from '@utils/fetch';

export const getNotifAchievement = () => {
  const options = {
    method: 'GET',
    url: '/users-management/v2/popup-gamification-info',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
