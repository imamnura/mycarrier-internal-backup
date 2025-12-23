import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListRole = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/users-management/v2/role',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getDetailRole = (roleId) => {
  const options = {
    method: 'GET',
    url: `/users-management/v2/role/${roleId}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const deleteRole = (roleId) => {
  const options = {
    method: 'DELETE',
    url: `/users-management/v2/role/${roleId}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getPrivilege = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/users-management/v2/privileges`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getPrivilegeByRole = (roleSlug, type) => {
  const options = {
    method: 'GET',
    url: `/users-management/v2/role/detail/${roleSlug}?type=${type}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getAllRole = () => {
  const options = {
    method: 'GET',
    url: `/users-management/v2/role`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getCheckRoleType = (roleSlug, type) => {
  const options = {
    method: 'GET',
    url: `/users-management/v2/role/detail/${roleSlug}?type=${type}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const postCreateRole = (opt) => {
  const options = {
    ...opt,
    method: 'POST',
    url: `/users-management/v2/role`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const putRole = (opt, roleId) => {
  const options = {
    ...opt,
    method: 'PUT',
    url: `/users-management/v2/role/${roleId}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};
