import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListSender = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/sender-id',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListCustomerSender = () => {
  const options = {
    method: 'GET',
    url: '/activation/internal/sender-id/customer-filtered',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListOperatorSender = () => {
  const options = {
    method: 'GET',
    url: '/activation/operator-type/list',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailBulk = (id) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/sender-id/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const putUpdateStatus = (id, payload, params) => {
  const options = {
    method: 'PUT',
    data: payload,
    params,
    url: `/activation/internal/sender-id/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
