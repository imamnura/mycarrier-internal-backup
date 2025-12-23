import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getList = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    // url: '/explore/v5/product', //product v2
    url: '/explore/v2/product', //product v1
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

// export const getMedia = (opt, type) => { //product v2
export const getMedia = (opt) => {
  const options = {
    data: opt,
    method: 'POST',
    // url:
    // type === 'icon'
    // ? `/explore/v1/media?useCompression=false`
    // : `/explore/v1/media`, //product v2
    url: '/explore/v1/media', //product v1
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const deleteMedia = (id) => {
  const options = {
    method: 'DELETE',
    url: `/explore/v1/media/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const fetchSubmitDocument = (data, method, id) => {
  const options = {
    data,
    method,
    url: id ? `/explore/v2/media/${id}` : '/explore/v2/media',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const deleteDocument = (id) => {
  const options = {
    method: 'DELETE',
    url: `/explore/v2/media/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const deleteProduct = (id) => {
  const options = {
    method: 'DELETE',
    // url: `/explore/v5/product/${id}`, //product v2
    url: `/explore/v4/product/${id}`, //product v1
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const updateProduct = ({ id, data }) => {
  //product v1
  // export const updateProduct = (data) => { //product v2
  const options = {
    method: 'PUT',
    // url: `/explore/v5/product`, //product v2
    url: `/explore/v4/product/${id}`, //product v1
    headers: { Authorization: getAccessToken() },
    data: data,
  };
  return fetch(options);
};

export const getDetailProduct = (id) => {
  const options = {
    method: 'GET',
    url: `/explore/v5/product/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const createProduct = (data, method) => {
  const options = {
    method,
    url: `/explore/v5/product`,
    headers: { Authorization: getAccessToken() },
    data: data,
  };
  return fetch(options);
};
