import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getListVisitNeucentrix = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/neucentrix-visit/v1',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailVisitNcx = (id) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/neucentrix-visit/v2/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export function updateStepVisitNcx(id, payload) {
  const options = {
    method: 'PUT',
    url: `/activation/internal/neucentrix-visit/v1/${id}/update-status`,
    data: payload,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
}

export const getAmList = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/neucentrix-visit/v1/am',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getVisitHistoryList = (id, opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/activation/internal/neucentrix-visit/v2/${id}/activity`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDropdownOption = (type, id) => {
  const url = {
    visitors: `/activation/internal/neucentrix-visit/v1/${id}/visitors`,
    location: '/activation/internal/neucentrix-visit/v1/dropdown-location',
  }[type];

  const options = {
    method: 'GET',
    url: url,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
