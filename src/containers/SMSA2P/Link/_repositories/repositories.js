import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListLinkActivation = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/request-link',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListCustomerLink = () => {
  const options = {
    method: 'GET',
    url: 'activation/internal/request-link/customer-filtered',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailLink = (orderNumber) => {
  const options = {
    method: 'GET',
    url: `activation/internal/request-link/detail/${orderNumber}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export function updateStatus(id, payload) {
  const options = {
    method: 'PUT',
    url: `activation/internal/request-link/${id}`,
    data: payload,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
}
