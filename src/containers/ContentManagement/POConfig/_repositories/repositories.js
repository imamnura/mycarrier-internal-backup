import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const deleteProduct = () => {};

export const getListProduct = (opt) => {
  const options = {
    ...opt,
    withCancel: true,
    method: 'GET',
    url: '/activation/internal/po-config/v1',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailProduct = (id) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/po-config/v1/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const updateProduct = (id, data, method = 'PUT') => {
  const additionalOptions = {
    true: {
      method,
      url: `/activation/internal/po-config/v1/${id}`,
    },
    false: {
      method: 'POST',
      url: `/activation/internal/po-config/v1`,
    },
  }[!!id];

  const options = {
    ...additionalOptions,
    data,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getDropdownOption = ({ params, ...opt }) => {
  const options = {
    ...opt,
    params,
    method: 'GET',
    url: 'activation/internal/po-config/v1/dropdown',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getOptionCategory = () => {
  const options = {
    method: 'GET',
    url: '/activation/purchase-order/v2/category',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
