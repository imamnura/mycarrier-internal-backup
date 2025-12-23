import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListOfDetailBroadcastInformation = (broadcastId, opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/mycarrier-quotation/internal/v1/broadcast/list-of-detail/${broadcastId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailBroadcastInformation = (id) => {
  const options = {
    method: 'GET',
    url: `/mycarrier-quotation/internal/v1/broadcast/detail/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListBroadcastInformation = (opt) => {
  const options = {
    ...opt,
    metthod: 'GET',
    url: '/mycarrier-quotation/internal/v1/broadcast/list',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postUploadFile = (file) => {
  const data = new FormData();
  data.append('file', file);
  const options = {
    data,
    method: 'POST',
    url: '/mycarrier-quotation/internal/v1/broadcast/upload',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const postBroadcastInformation = (id, data) => {
  const pathUrl = !id ? 'broadcast/create' : `broadcast/update/${id}`;

  const options = {
    data,
    method: id ? 'PUT' : 'POST',
    url: `/mycarrier-quotation/internal/v1/${pathUrl}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getOptionContactGroup = () => {
  const options = {
    metthod: 'GET',
    url: '/mycarrier-quotation/internal/v1/broadcast/contact-group',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const updateStatusBroadcast = (data) => {
  const options = {
    data,
    method: 'POST',
    url: `/mycarrier-quotation/internal/v1/broadcast/status`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
