import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListCustomerIPPrefix = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/ip-prefix/v1/customer',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export function updateStatus(id, payload) {
  const options = {
    method: 'PUT',
    url: `/activation/internal/ip-prefix/v1/${id}`,
    data: payload,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
}

export const getListRequest = (id, opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/activation/internal/ip-prefix/v1/list/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailCustomer = (id) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/ip-prefix/v1/customer/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getOptionForm = (item, params) => {
  const options = {
    params,
    method: 'GET',
    url: `/activation/internal/ip-prefix/v1/${item}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailIpPrefix = (id) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/ip-prefix/v1/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const downloadReport = (params) => {
  const options = {
    params,
    method: 'GET',
    url: `/activation/internal/ip-prefix/v1/download-report`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListCommnent = (id, opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/activation/internal/ip-prefix/v1/comments/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postComment = (opt) => {
  const options = {
    ...opt,
    method: 'POST',
    url: `/activation/internal/ip-prefix/v1/comment`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
