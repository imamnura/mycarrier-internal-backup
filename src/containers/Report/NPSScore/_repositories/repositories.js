import fetch from '@utils/fetch';
import { getAccessToken, getTimezone } from '@utils/common';

export const getNPSReport = (opt) => {
  const options = {
    ...opt,
    withCancel: true,
    method: 'GET',
    url: '/activation/dashboard/nps',
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const getDetailData = (params) => {
  const url = '/activation/nps/v2/list-nps'

  if (!url) {
    return;
  }

  const options = {
    params,
    withCancel: true,
    method: 'GET',
    url: url,
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const downloadDetailData = (params, type) => {
  const url = {
    explore: '/explore/v1/nps/download',
    evaluate: '/mycarrier-quotation/bakes/v1/nps-list/download',
    pay: '/mycarrier-quotation/invoice/v1/nps-list/download',
    activate: '/activation/nps-list/download',
    getsupport: '/tickets/fault/v1/nps-list/download',
    use: '/activation/nps-visit/v1/download',
  }[type];

  const options = {
    params: params,
    withCancel: true,
    method: 'GET',
    url: url,
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const putCheckedNPS = (rateId, data) => {
  const options = {
    data,
    method: 'PUT',
    url: `/activation/nps-update/${rateId}`,
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const getDropdownOption = ({ params, ...opt }, type) => {
  const journey = {
    explore: 'explore',
    evaluate: 'evaluate',
    activate: 'activate',
    getsupport: 'getsupport',
    pay: 'pay',
    use: 'use',
  }[type];

  const options = {
    ...opt,
    params: {
      ...params,
      journey,
    },
    method: 'GET',
    url: '/activation/dashboard/nps/dropdown',
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

// Revamp ----

export const getNpsResult = (opt) => {
  const options = {
    ...opt,
    withCancel: true,
    method: 'GET',
    url: '/activation/nps/v2/nps-all-journey',
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const getNpsTrend = (opt) => {
  const options = {
    ...opt,
    withCancel: true,
    method: 'GET',
    url: '/activation/nps/v2/trend-nps',
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const getNpsCategory = (opt) => {
  const options = {
    ...opt,
    withCancel: true,
    method: 'GET',
    url: '/activation/nps/v2/category-revamp',
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const getNpsVOC = (opt) => {
  const options = {
    ...opt,
    withCancel: true,
    method: 'GET',
    url: '/activation/nps/v2/top-5-voice-of-customer',
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const getNpsCustomer = (opt) => {
  const options = {
    ...opt,
    withCancel: true,
    method: 'GET',
    url: '/activation/nps/v2/top-5-survey',
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const getOptionsCustomer = (journey) => {
  const url = {
    evaluate: '/mycarrier-quotation/nps-customer',
    pay: '/activation/nps-customer',
    activate: '/activation/nps-customer',
    getsupport: '/tickets/fault/v1/nps-customer',
    use: '/activation/nps-customer',
  }[journey];

  if (!url) {
    return;
  }

  const options = {
    withCancel: true,
    method: 'GET',
    url,
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const updateNps = (data) => {
  const options = {
    data,
    method: 'PUT',
    url: `/activation/nps/v2/update-nps`,
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const getNpsList = (params) => {
  const url = '/activation/nps/v2/list-nps'

  if (!url) {
    return;
  }

  const options = {
    params,
    withCancel: true,
    method: 'GET',
    url: url,
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const getOptionsProduct = (type) => {
  const url = {
    activate: '/activation/nps-product',
    getsupport: '/tickets/fault/v1/nps-product',
  }[type];

  if (!url) {
    return;
  }

  const options = {
    withCancel: true,
    method: 'GET',
    url,
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const downloadNpsList = (params) => {
  const options = {
    params,
    withCancel: true,
    method: 'GET',
    url: '/activation/nps/v2/download-list-nps',
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const getNpsScoreAllJourney = (opt) => {
  const options = {
    ...opt,
    withCancel: true,
    method: 'GET',
    url: '/activation/nps/v2/nps-score',
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const getNpsWorklog = (params) => {
  const options = {
    params,
    method: 'GET',
    url: '/activation/nps/v2/nps-worklog',
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const getNpsTotalRespondent = (opt) => {
  const options = {
    ...opt,
    withCancel: true,
    method: 'GET',
    url: '/activation/nps/v2/nps-revamp-respondent',
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};

export const getFollowUpSummary = (params) => {
  const options = {
    params,
    method: 'GET',
    url: '/activation/nps/v2/summary-follow-up',
    headers: {
      Authorization: getAccessToken(),
      timezone: getTimezone()
    },
  };
  return fetch(options);
};
