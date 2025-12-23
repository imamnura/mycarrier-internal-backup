import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListNonBulk = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/non-bulk/internal/v1/request-activation',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListCustomerNonBulk = () => {
  const options = {
    method: 'GET',
    url: '/activation/internal/non-bulk/v1/customer-filtered',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailNonBulk = (id) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/non-bulk/v1/request-activation/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailCampaign = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/activation/internal/non-bulk/v1/request-activation/campaign-detail`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const updateStatusNonBulk = (id, payload) => {
  const options = {
    data: payload,
    method: 'PUT',
    url: `/activation/internal/non-bulk/v1/request-activation/status-update/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDropdownOption = ({ params, ...opt }) => {
  const options = {
    ...opt,
    params: {
      ...params,
      size: 1000,
    },
    method: 'GET',
    url: 'activation/non-bulk/v1/dropdown',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const uploadFile = (payload) => {
  const options = {
    data: payload,
    method: 'POST',
    url: '/activation/non-bulk/v1/upload-file',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const updateNonBulk = (id, payload) => {
  const options = {
    data: payload,
    method: 'PUT',
    url: `/activation/internal/non-bulk/v1/request-activation/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const checkBrandName = (payload) => {
  const options = {
    data: payload,
    method: 'POST',
    url: `/activation/non-bulk/v1/master-brand/check`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postUploadFile = (file) => {
  const data = new FormData();
  data.append('files', file);
  const options = {
    data,
    method: 'POST',
    url: '/activation/non-bulk/v1/upload-file',
    headers: {
      Authorization: getAccessToken()
    }
  };

  return fetch(options);
};
