import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListCustomer = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/delivery-tracking/v1/customer',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getDetailCustomer = (custAccntNum) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/delivery-tracking/v1/customer/${custAccntNum}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getDetailOrder = (id, opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/activation/internal/delivery-tracking/v1/order/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getSummaryService = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/activation/internal/delivery-tracking/v1/summary-order-line-status`,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getListServices = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/activation/internal/delivery-tracking/v1/service`,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getDetailService = (id, opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/activation/internal/delivery-tracking/v1/service/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getMRTGgraph = (id, opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/tickets/mrtg/internal/v3/service/products/${id}/graphic`,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getListMTTR = (id, opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/tickets/mrtg/internal/v3/service/products/${id}/mttr`,
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const getListOrder = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/delivery-tracking/v1/order',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getOrderSummary = (params) => {
  const options = {
    params,
    method: 'GET',
    url: '/activation/internal/delivery-tracking/v1/summary-order-header-status',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
