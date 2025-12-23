import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getDataGraph = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/activation/internal/sender-id/reporting',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDropdownOption = (type) => {
  const url = {
    customer: `/activation/internal/sender-id/customer-filtered`,
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

export const getDownloadReportNonBulk = (params) => {
  const options = {
    params,
    method: 'GET',
    url: `/activation/internal/sender-id/report-download`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
