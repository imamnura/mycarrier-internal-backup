import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListBaso = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/baso',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getFilterCustomerOptions = () => {
  const options = {
    method: 'GET',
    url: '/activation/baso/customer-filtered',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getFilterProductOptions = () => {
  const options = {
    method: 'GET',
    url: '/activation/baso/product-filtered',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getFilterSegmentOptions = () => {
  const options = {
    method: 'GET',
    url: '/activation/internal/baso/segment-filtered',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getFilterAmOptions = () => {
  const options = {
    method: 'GET',
    url: '/activation/internal/baso/am-filtered',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailBaso = (orderNumber) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/baso/${orderNumber}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const updateStatusBaso = (id, payload) => {
  const options = {
    data: payload,
    method: 'PUT',
    url: `/activation/internal/baso/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const uploadFile = (payload, setProgress) => {
  const options = {
    data: payload,
    method: 'POST',
    url: `/activation/baso/upload-ba`,
    headers: {
      Authorization: getAccessToken(),
    },
    onUploadProgress: (data) => {
      setProgress(Math.round((100 * data.loaded) / data.total));
    },
  };
  return fetch(options);
};
