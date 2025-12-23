import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getList = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/explore/v1/brochure',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getProduct = () => {
  const options = {
    method: 'GET',
    url: 'explore/v1/product-brochure',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getDetailBrochure = (id) => {
  const options = {
    method: 'GET',
    url: `/explore/v1/brochure/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
