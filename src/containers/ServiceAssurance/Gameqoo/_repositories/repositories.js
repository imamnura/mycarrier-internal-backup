import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getList = (params) => {
  const options = {
    params,
    withCancel: true,
    method: 'GET',
    url: '/tickets/gameqoo/v1/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetail = (referenceId) => {
  const options = {
    method: 'GET',
    url: `/tickets/gameqoo/v1/internal/detail/${referenceId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const downloadList = (params) => {
  const options = {
    params,
    method: 'GET',
    url: '/tickets/gameqoo/v1/internal/download',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const updateTicket = (id, data) => {
  const options = {
    data,
    method: 'PUT',
    url: `/tickets/gameqoo/v1/internal/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const rejectTicket = (data) => {
  const options = {
    data,
    method: 'PUT',
    url: `/tickets/fault/v2/ticket-reject/internal`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getCategory = () => {
  const options = {
    method: 'GET',
    url: '/tickets/gameqoo/v1/internal/sfCategory',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getSubcategory = (params) => {
  const options = {
    params,
    method: 'GET',
    url: '/tickets/gameqoo/v1/internal/sfSubCategory',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getFirstCall = () => {
  const options = {
    withCancel: true,
    method: 'GET',
    url: '/tickets/fault/v1/list-first-call/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getProduct = (params) => {
  const options = {
    params,
    withCancel: true,
    method: 'GET',
    url: '/tickets/fault/v2/list-product-name/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getService = () => {
  const options = {
    withCancel: true,
    method: 'GET',
    url: '/tickets/fault/v1/list-service/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getSegment = (params) => {
  const options = {
    params,
    withCancel: true,
    method: 'GET',
    url: '/tickets/fault/v1/list-segment/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getComplaint = () => {
  const options = {
    withCancel: true,
    method: 'GET',
    url: '/tickets/fault/v1/list-complaint/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getSymptomp = (params) => {
  const options = {
    params,
    withCancel: true,
    method: 'GET',
    url: 'tickets/fault/v1/list-category-symptomp/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getUrgency = () => {
  const options = {
    withCancel: true,
    method: 'GET',
    url: '/tickets/fault/v1/list-urgency/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDummySid = (params) => {
  const options = {
    params,
    method: 'GET',
    url: `/tickets/fault/v2/list-dummy-sid/internal`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailDummy = (params) => {
  const options = {
    params,
    method: 'GET',
    url: `/tickets/fault/v2/detail-dummy-sid/internal`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
