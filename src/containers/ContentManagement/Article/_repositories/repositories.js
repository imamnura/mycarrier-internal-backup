import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';
import { create_UUID } from '@utils/text';

export const getList = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/explore/article/v1',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const deleteArticle = (id) => {
  const options = {
    method: 'DELETE',
    url: `/explore/article/v1/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getArticle = (id) => {
  const options = {
    method: 'GET',
    url: `/explore/article/v1/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const submitArticle = ({ data, method }) => {
  const options = {
    method,
    url: `explore/article/v1`,
    data,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getUrlMedia = () => (file) => {
  let data = new FormData();
  let fileImage = file;

  const nameImage = file.name.replace(/\s+/g, '-');
  fileImage = new File([file], nameImage, { type: file.type });

  data.append('mediaPath', fileImage);
  data.append('mediaId', create_UUID(true));
  data.append('mediaName', file.name);

  const options = {
    method: 'POST',
    url: '/explore/v1/media',
    data,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const deleteMedia = (mediaId) => {
  const options = {
    method: 'DELETE',
    url: `/explore/v1/media/${mediaId}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getListProduct = (opt) => {
  const options = {
    ...opt, //product v1
    method: 'GET',
    // url: '/explore/v5/product?useAtDropdown=true&relatedType=news', //product v2
    // url: `/explore/v2/product`, //product v1
    url: '/product-mgt/product-config/v1?status=published',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getListCategory = () => {
  const options = {
    method: 'GET',
    url: `/explore/article/v1/categories`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};
