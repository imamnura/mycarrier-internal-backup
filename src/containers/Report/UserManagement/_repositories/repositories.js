import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getChartUserSegment = (params) => {
  const options = {
    url: '/users-management/v1/report/user-segment',
    params,
    methot: 'GET',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getChartJourneySegment = (params) => {
  const options = {
    url: '/mycarrier-quotation/v1/report/journey-segment',
    params,
    methot: 'GET',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getChartJourneyCustomer = (params) => {
  const options = {
    url: '/mycarrier-quotation/v1/report/journey-customer',
    params,
    methot: 'GET',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getChartJourneyInternal = (params) => {
  const options = {
    url: '/mycarrier-quotation/v1/report/journey-internal',
    params,
    methot: 'GET',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getViewAllDataJourney = (opt, type) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/mycarrier-quotation/v1/report/journey-${type}/detail`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getGraphCompanyAccessing = (opt, type) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/mycarrier-quotation/v1/report/journey-${type}/company-accessing`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
