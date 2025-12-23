import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getList = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/explore/v4/banner`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getUrlMedia = (data) => {
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

export const fetchSubmitContent = ({ data, method, id }) => {
  const options = {
    data,
    method,
    url: id ? `/explore/v4/banner/${id}` : '/explore/v4/banner',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getDetailContent = (id) => {
  const options = {
    method: 'GET',
    url: `/explore/v4/banner/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const deleteEvent = (eventId) => {
  const options = {
    params: {
      type: 'event',
    },
    method: 'DELETE',
    url: `/explore/v4/banner/${eventId}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const checkValidationUnique = ({ data, type, action, id }) => {
  const options = {
    method: 'POST',
    url:
      action === 'update'
        ? `/explore/v1/validation?type=${type}&action=${action}&id=${id}`
        : `/explore/v1/validation?type=${type}&action=${action}`,
    data,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getListProduct = (opt) => {
  const options = {
    ...opt, //product v1
    method: 'GET',
    // url: '/explore/v5/product?useAtDropdown=true&relatedType=banner', //product v2
    url: '/explore/v2/product', //product v1
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const savePriviewPage = (data) => {
  const options = {
    method: 'POST',
    data,
    url: `/explore/v1/preview`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getUrlMediaNoCompress = (data, type) => {
  const options = {
    method: 'POST',
    url:
      type === 'icon'
        ? `/explore/v1/media?useCompression=false`
        : `/explore/v1/media`,
    data,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};
