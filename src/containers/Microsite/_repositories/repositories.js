import fetch from '@utils/fetch';
import { key } from '@configs';

export const getDataMicrositeVisitNCX = (id, accessToken) => {
  const options = {
    method: 'GET',
    url: `/activation/neucentrix-visit/v1/microsite/${id}`,
    headers: {
      Authorization: accessToken,
    },
  };
  return fetch(options);
};

export const getAmList = (opt, accessToken) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/microsite/neucentrix/microsite/am',
    headers: {
      Authorization: accessToken,
    },
  };
  return fetch(options);
};

export const updateStatusVisitNCX = (id, payload, accessToken) => {
  const options = {
    data: payload,
    method: 'PUT',
    url: `/activation/internal/neucentrix-visit/v1/microsite/${id}/update`,
    headers: {
      Authorization: accessToken,
    },
  };
  return fetch(options);
};

export const getDataMicrositePO = (id) => {
  const options = {
    method: 'GET',
    url: `/activation/internal/purchase-order/microsite/${id}`,
    headers: {
      Authorization: key.basicAuth,
    },
  };
  return fetch(options);
};

export const updateStatusPurchaseOrder = (id, payload) => {
  const options = {
    data: payload,
    method: 'PUT',
    url: `/activation/internal/purchase-order/microsite/${id}`,
    headers: {
      Authorization: key.basicAuth,
    },
  };
  return fetch(options);
};

export const getDataMicrositePOBaso = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/activation/internal/purchase-order/v2/microsite/baso-approval`,
    headers: {
      Authorization: key.basicAuth,
    },
  };
  return fetch(options);
};
