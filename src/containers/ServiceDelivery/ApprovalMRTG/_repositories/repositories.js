import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListCustomerMRTG = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/tickets/mrtg/internal/v3/customer',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailCustomerMRTG = (id) => {
  const options = {
    method: 'GET',
    url: `/tickets/mrtg/internal/v3/customer/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListMRTGRequest = (id, opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/tickets/mrtg/internal/v3/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailRequestMRTG = (id) => {
  const options = {
    method: 'GET',
    url: `/tickets/mrtg/internal/v3/request/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListMRTGService = (id, opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/tickets/mrtg/internal/v3/services/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const updateRequestMRTG = (id, payload) => {
  const options = {
    data: payload,
    method: 'PUT',
    url: `/tickets/mrtg/internal/v3/request/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailLoginData = (id) => {
  const options = {
    method: 'GET',
    url: `/tickets/mrtg/internal/v3/customer/${id}/detail-login-data`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const addLoginData = (id, payload) => {
  const options = {
    data: payload,
    method: 'PUT',
    url: `/tickets/mrtg/internal/v3/customer/${id}/add-login-data`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const deleteLoginData = (id) => {
  const options = {
    method: 'DELETE',
    url: `/tickets/mrtg/internal/v3/customer/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};
