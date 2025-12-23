import fetch from '../../../../utils/fetch';
import { getAccessToken } from '../../../../utils/common';

export const getList = (params) => {
  const options = {
    params,
    withCancel: true,
    method: 'GET',
    url: '/tickets/ticket/v2/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const downloadList = (params) => {
  const options = {
    params: params,
    withCancel: true,
    method: 'POST',
    url: '/tickets/ticket/internal/downloadListTicketFault',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getCustomerName = () => {
  const options = {
    withCancel: true,
    method: 'GET',
    url: '/tickets/ticket/v2/customer-group',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetail = (referenceId) => {
  const options = {
    withCancel: true,
    method: 'GET',
    url: `/tickets/ticket/v2/internal/${referenceId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const updateDetailStatus = (referenceId, payload) => {
  const options = {
    data: payload,
    withCancel: true,
    method: 'PUT',
    url: `/tickets/ticket/v2/internal/${referenceId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
