import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getList = (opt) => {
  const options = {
    ...opt,
    withCancel: true,
    method: 'GET',
    url: '/mycarrier-quotation/internal/invoice/v1/banner/list',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const fetchBanner = (operations, data, id) => {
  const additionalOptions = {
    Add: {
      method: 'POST',
      url: `/mycarrier-quotation/internal/invoice/v1/banner/create`,
    },
    Edit: {
      method: 'PUT',
      url: `/mycarrier-quotation/internal/invoice/v1/banner/edit`,
    },
    Detail: {
      method: 'GET',
      url: `/mycarrier-quotation/internal/invoice/v1/banner/detail/${id}`,
    },
    Reorder: {
      method: 'PUT',
      url: `/mycarrier-quotation/internal/invoice/v1/banner/reorder`,
    },
    Delete: {
      method: 'DELETE',
      url: `/mycarrier-quotation/internal/invoice/v1/banner/delete/${id}`,
    },
  }[operations];

  const options = {
    ...additionalOptions,
    withCancel: true,
    data,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const postUploadImage = () => (file) => {
  const data = new FormData();

  data.append('file', file);
  data.append('type', 'banner-invoice');
  data.append('id', new Date().getTime());

  const options = {
    data,
    method: 'POST',
    url: 'mycarrier-quotation/general/v1/upload-file',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};
