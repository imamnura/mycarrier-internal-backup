import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getWhatsNewContent = () => {
  const options = {
    method: 'GET',
    url: '/mycarrier-quotation/version-info',
    params: { type: 'internal' },
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
