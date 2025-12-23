import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getList = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/tickets/monitoring-operator/internal/v1`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getOptionsOperator = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/tickets/monitoring-operator/internal/v1/operator`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getOptionsPoi = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/tickets/monitoring-operator/internal/v1/poi`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getOptionsTrunkGroup = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/tickets/monitoring-operator/internal/v1/tgw`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
