import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListDropdown = (payload) => {
  const options = {
    params: payload,
    method: 'GET',
    url: `/activation/internal/services/v2/dropdown`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListCustomer = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/services/v2',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailCustomer = (id) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/services/v2/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListProject = (id, opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/activation/internal/services/v2/${id}/project`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListServices = (id, opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/activation/internal/services/v2/${id}/list`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getSummary = (id, opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/activation/internal/services/v2/${id}/summary`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailProduct = (id, custAccntNum) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/services/v2/${custAccntNum}/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getMRTGgraph = (id, payload) => {
  const options = {
    params: payload,
    method: 'GET',
    url: `/tickets/mrtg/internal/v3/service/products/${id}/graphic`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListMTTR = (id, payload) => {
  const options = {
    params: payload,
    method: 'GET',
    url: `/tickets/mrtg/internal/v3/service/products/${id}/mttr`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const downloadList = (id, payload) => {
  const options = {
    params: payload,
    method: 'GET',
    url: `/activation/internal/services/v2/${id}/download`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
