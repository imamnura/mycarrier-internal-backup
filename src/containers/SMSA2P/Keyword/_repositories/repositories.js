import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListKeyword = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/keyword',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListCustomerKeyword = () => {
  const options = {
    method: 'GET',
    url: '/activation/internal/keyword/customer-filtered',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailKeyword = (id) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/keyword/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
}

export const updateStatusKeyword = (id, data) => {
  const options = {
    data,
    method: 'PUT',
    url: `/activation/internal/keyword/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
