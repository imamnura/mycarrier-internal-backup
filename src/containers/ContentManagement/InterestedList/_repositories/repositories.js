import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';
import { AUTH } from '@__old/configs';

export const getList = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/explore/v1/cart',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const downloadList = (opt) => {
  const options = {
    ...opt,
    method: 'POST',
    url: '/explore/v2/cart/download',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getSource = () => {
  const options = {
    method: 'GET',
    url: '/explore/v3/cart/source',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getTabList = (opt, tab, id) => {
  const url = {
    0: `/explore/v1/starclick-activity-list/${id}`,
    1: `/explore/v1/starclick-notes-list/${id}`,
    2: `/explore/v1/starclick-attachments-list/${id}`,
    3: `/explore/v1/starclick-products-list/${id}`,
    4: `/explore/v1/starclick-contacts-list/${id}`,
    5: `/explore/v1/starclick-quote-list/${id}`,
    // 5: `/catalog/mycarrier/v1/cart`,
  }[tab];

  const options = {
    ...opt,
    method: 'GET',
    url,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getListAM = (params) => {
  const options = {
    params,
    method: 'GET',
    url: '/explore/v3/cart/assign',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getListCompany = () => {
  const options = {
    // ...opt,
    method: 'GET',
    // url: '/users-management/v2/customer-account',
    url: '/explore/v1/starclick-ca',
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const checkAmValidSc = (nik) => {
  const options = {
    method: 'GET',
    url: `/explore/v3/cart/am-valid-sc?nik=${nik}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const checkScIntegrationStatus = () => {
  const options = {
    method: 'GET',
    url: `/explore/v3/cart/sc-integration-status`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const submitInterestMapping = (data, id) => {
  const options = {
    data,
    method: 'PUT',
    url: `/explore/v3/cart/${id}`,
    headers: { Authorization: getAccessToken() },
  };
  return fetch(options);
};

export const getStatusEmail = (emailId) => {
  const options = {
    method: 'GET',
    url: `/notifications/email/v1/mailgun?messageId=${emailId}&limit=1`,
    headers: { Authorization: AUTH.BASIC },
  };
  return fetch(options);
};

export const getStatusWhatsapp = (messageId) => {
  const options = {
    method: 'GET',
    url: `/notifications/whatsapp/v1/status?messageId=${messageId}`,
    headers: { Authorization: AUTH.BASIC },
  };
  return fetch(options);
};
