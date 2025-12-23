import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getList = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/tickets/neucloud/v1/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const downloadData = (params) => {
  const options = {
    params: params,
    withCancel: true,
    method: 'POST',
    url: '/tickets/neucloud/v1/internal/download-ticket',
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
    url: `/tickets/neucloud/v1/internal/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
