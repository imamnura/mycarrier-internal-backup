import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListLBA = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/lba',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListCustomerLBA = () => {
  const options = {
    method: 'GET',
    url: '/activation/internal/lba/customer-filtered',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailLBA = (id) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/lba/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const updateStatusLBA = (id, data) => {
  const options = {
    data,
    method: 'PUT',
    url: `/activation/internal/lba/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const resendEmailNotif = (id) => {
  const options = {
    method: 'POST',
    url: `/activation/internal/lba/resend-email/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
