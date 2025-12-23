import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getVersionInfo = () => {
  const options = {
    method: 'GET',
    url: '/mycarrier-quotation/current-version-info',
    params: { type: 'internal' },
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
