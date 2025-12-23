import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListIsolate = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/mycarrier-quotation/internal/isolate/v1/list',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getOptionProduct = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/mycarrier-quotation/isolate/v1/product-list',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailIsolate = (isolateId) => {
  const options = {
    method: 'GET',
    url: `/mycarrier-quotation/internal/isolate/v1/${isolateId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
