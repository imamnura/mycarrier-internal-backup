import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getList = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/users-management/v2/privileges',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getDetailPrivilege = (journeyId) => {
  const options = {
    method: 'GET',
    url: `/users-management/v2/privileges/${journeyId}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const deleteJourney = (journeyId) => {
  const options = {
    method: 'DELETE',
    url: `/users-management/v2/privileges/${journeyId}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getIsUsedPrivilege = (params) => {
  const options = {
    method: 'GET',
    params,
    url: `/users-management/v2/privileges/check`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getPrivilege = (id) => {
  const options = {
    method: 'GET',
    url: `/users-management/v2/privileges/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const savePrivilege = (data) => {
  const options = {
    method: 'PUT',
    url: '/users-management/v2/privileges',
    data,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const deletePrivilege = ({ type, id }) => {
  const options = {
    method: 'GET',
    url: `/users-management/v2/privileges/check?type=${type}&id=${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};
