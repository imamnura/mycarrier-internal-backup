import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListReportNeucentrix = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/monitoring/neucentrix',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailReportNeucentrix = (id) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/monitoring/neucentrix/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getCompanyList = () => {
  const options = {
    method: 'GET',
    url: '/users-management/v2/customer-account?segment=mycarrier&nipnas=&custAccntNum=&name=',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const uploadFile = (payload) => {
  const options = {
    data: payload,
    method: 'POST',
    url: '/activation/internal/monitoring/neucentrix/upload-file',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const deleteFile = (fileName) => {
  const options = {
    method: 'DELETE',
    url: `/activaiton/internal/neucentrix/remove-file/${fileName}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const uploadReport = (payload) => {
  const options = {
    data: payload,
    method: 'POST',
    url: '/activation/internal/monitoring/neucentrix',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export function addCompany(id, payload) {
  const options = {
    method: 'PUT',
    url: `/activation/internal/monitoring/neucentrix/${id}/add-company`,
    data: payload,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
}

export function reuploadDocument(id, payload) {
  const options = {
    method: 'PUT',
    url: `/activation/internal/monitoring/neucentrix/${id}/reupload`,
    data: payload,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
}
