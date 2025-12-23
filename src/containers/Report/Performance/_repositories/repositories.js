import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';

export const getChartData = (params, tab) => {
  const url = {
    po: '/activation/performance/purchase-order',
    baso: '/activation/performance/baso',
    bakes: '/mycarrier-quotation/bakes/v1/performance',
    offeringLetter: '/mycarrier-quotation/quotation/v1/performance',
    smsa2p: '/tickets/ticket/v2/performance/internal',
    neucloud: '/tickets/neucloud/v1/performance/internal',
    gp: '/tickets/fault/v1/performance/internal',
    visitNCX: '/activation/performance/neucentrix-visit',
    timeApproveVisit:
      '/activation/performance/neucentrix-visit/time-to-approve',
  }[tab];

  const options = {
    url,
    params,
    method: 'GET',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getList = (opt, tab) => {
  const url = {
    po: '/activation/performance/purchase-order-list',
    baso: '/activation/performance/baso-list',
    visitNCX: '/activation/performance/neucentrix-visit/list',
  }[tab];

  if (!url) return;

  const options = {
    ...opt,
    url,
    method: 'GET',
    withCancel: true,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const downloadDetailData = (tab, params) => {
  const url = {
    po: '/activation/performance/purchase-order-list/download',
    baso: '/activation/performance/baso-list/download',
    smsa2p: '/tickets/ticket/v2/performance/internal/download',
    neucloud: '/tickets/neucloud/v1/performance/internal/download',
    visitNCX: '/activation/performance/neucentrix-visit/download',
    timeApproveVisit:
      '/activation/performance/neucentrix-visit/time-to-approve/download',
      gp: '/tickets/fault/v1/performance/internal/download'
  }[tab];

  if (!url) return;

  const options = {
    url,
    method: 'GET',
    params,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getFilterCustomerOptions = (tab) => {
  const url = {
    po: '/activation/performance/customer/purchase-order',
    baso: '/activation/performance/customer/baso',
    visitNCX: '/activation/performance/customer/neucentrix-visit',
    timeApproveVisit: '/activation/performance/customer/neucentrix-visit',
  }[tab];

  if (!url) return;

  const options = {
    url,
    method: 'GET',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getFilterDataCenterOptions = (accessToken) => {
  const options = {
    url: '/activation/neucentrix-visit/v1/before-login/locations',
    method: 'GET',
    headers: {
      Authorization: accessToken,
    },
  };
  return fetch(options);
};
