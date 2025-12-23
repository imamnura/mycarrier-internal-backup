import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListAvailabilityRack = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/neucentrix-visit/v1/availability-racks',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDataAvailabilityRack = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/neucentrix-visit/v1/availability-rack-report',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
