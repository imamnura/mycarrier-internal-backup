import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListUser = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/users-management/mycarrier/v1/customers',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getFilterCustomer = () => {
  const options = {
    method: 'GET',
    url: '/users-management/mycarrier/v1/customers/dropdown-type',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getAMProfile = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/users-management/v2?role=account_manager&nameApp=mycarrier',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getCustomerProfile = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/users-management/v2/customer-account?role=account_manager&segment=mycarrier',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const addAMMapping = (data, userId) => {
  const options = {
    data,
    method: 'PUT',
    url: `/users-management/v2/update/${userId}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getListAmBasedOnCustomer = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/users-management/mycarrier/v1/customers/am`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getDetailCustomer = (id) => {
  const options = {
    method: 'GET',
    url: `/users-management/mycarrier/v1/customers/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getFilterOptions = (type) => {
  const optionsType = {
    segment: 'dropdown-segment',
    jobtitle: 'am/dropdown-jobtitle',
  }[type];

  const options = {
    method: 'GET',
    url: `/users-management/mycarrier/v1/customers/${optionsType}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const downloadAmMapping = (params) => {
  const options = {
    params: params,
    withCancel: true,
    method: 'GET',
    url: '/users-management/mycarrier/v1/customers/download',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
