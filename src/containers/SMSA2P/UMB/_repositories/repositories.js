import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListUMB = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/umb',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListCustomerUMB = () => {
  const options = {
    method: 'GET',
    url: 'activation/internal/umb/customer-filtered',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailUMB = (orderNumber) => {
  const options = {
    method: 'GET',
    url: `activation/internal/umb/${orderNumber}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const updateStatus = (id, payload) => {
  const options = {
    method: 'PUT',
    url: `activation/internal/umb/${id}`,
    data: payload,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
