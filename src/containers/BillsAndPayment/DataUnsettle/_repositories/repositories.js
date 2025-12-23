import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getDetailDataUnsettle = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/mycarrier-quotation/internal/invoice/v1/unsettle-detail',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListDataUnsettle = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/mycarrier-quotation/internal/invoice/v1/unsettle-summary',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDownloadDataUnsettle = (type, params) => {
  const url = {
    summary:
      '/mycarrier-quotation/internal/invoice/v1/unsettle-summary/download',
    detail: '/mycarrier-quotation/internal/invoice/v1/unsettle-detail/download',
  }[type];

  const options = {
    url,
    params,
    method: 'GET',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
