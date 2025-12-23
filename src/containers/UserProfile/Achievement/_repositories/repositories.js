import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getDetailAchievement = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/users-management/v2/achievement-profile-mycarrier',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListAchievement = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/users-management/v2/achievement-profile-mycarrier-list',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const submitDailyCheckin = (payload) => {
  const options = {
    data: payload,
    method: 'PUT',
    url: '/users-management/v2/run-activity-gamification',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

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
