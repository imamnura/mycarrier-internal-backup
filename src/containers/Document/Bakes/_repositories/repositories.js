import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListBakes = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/mycarrier-quotation/bakes/v1',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getFilterCompanyOptions = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/mycarrier-quotation/bakes/v1/company-list',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailBakes = (bakesId) => {
  const options = {
    method: 'GET',
    url: `/mycarrier-quotation/bakes/v1/${bakesId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const putStatusBakes = ({ bakesId, data }) => {
  const options = {
    data,
    method: 'PUT',
    url: `/mycarrier-quotation/bakes/v1/status/${bakesId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const uploadSignedBakes = (data) => {
  const options = {
    data,
    method: 'POST',
    url: '/mycarrier-quotation/bakes/v1/upload-bakes-internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const putBakesReviewer = ({ bakesId, data }) => {
  const options = {
    data,
    method: 'PUT',
    url: `/mycarrier-quotation/bakes/v1/update-reviewer/${bakesId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
