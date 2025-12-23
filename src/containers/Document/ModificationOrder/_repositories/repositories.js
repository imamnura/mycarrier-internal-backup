import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListModificationOrder = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/modification-order',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getFilterCustomerOptions = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/modification-order/customer',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getFilterProductOptions = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/modification-order/products',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailModificationOrder = (orderNumber) => {
  const options = {
    method: 'GET',
    url: `/activation/modification-order/${orderNumber}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const updateStatusModificationOrder = (id, payload, status) => {
  const opt = {
    returned: {
      url: `/activation/modification-order/update/${id}`,
      method: 'PUT',
    },
    rejected: {
      url: `/activation/modification-order/update/${id}`,
      method: 'PUT',
    },
    'Service Upgrading': {
      url: `/activation/modification-order/update-bakes/${id}`,
      method: 'PUT',
    },
    'Review Bakes': {
      url: `/activation/modification-order/approve-bakes/${id}`,
      method: 'POST',
    },
  }[payload?.status || status];

  const options = {
    data: payload,
    headers: {
      Authorization: getAccessToken(),
    },
    ...opt,
  };
  return fetch(options);
};

export const getBakesOptions = (id, type) => {
  const opt = {
    'Existing Customer BAKES': {
      url: `activation/modification-order/bakes-exist/${id}`,
    },
    'From BAKES Module': {
      url: `activation/modification-order/all-bakes`,
    },
  }[type];

  const options = {
    method: 'GET',
    headers: {
      Authorization: getAccessToken(),
    },
    ...opt,
  };
  return fetch(options);
};
