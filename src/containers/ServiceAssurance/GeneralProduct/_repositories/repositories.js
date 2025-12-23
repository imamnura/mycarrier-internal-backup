import fetch from '../../../../utils/fetch';
import { getAccessToken } from '../../../../utils/common';

export const getList = (params) => {
  const options = {
    params,
    withCancel: true,
    method: 'GET',
    url: '/tickets/fault/v1/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetail = (id) => {
  const options = {
    method: 'GET',
    url: `/tickets/fault/v1/detail-ticket/internal/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getSourceChannel = () => {
  const options = {
    withCancel: true,
    method: 'GET',
    url: '/tickets/fault/v1/source-channel/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getFirstCall = () => {
  const options = {
    withCancel: true,
    method: 'GET',
    url: '/tickets/fault/v1/list-first-call/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getProduct = (params) => {
  const options = {
    params,
    withCancel: true,
    method: 'GET',
    url: '/tickets/fault/v2/list-product-name/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getService = () => {
  const options = {
    withCancel: true,
    method: 'GET',
    url: '/tickets/fault/v1/list-service/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getSegment = (params) => {
  const options = {
    params,
    withCancel: true,
    method: 'GET',
    url: '/tickets/fault/v1/list-segment/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getComplaint = () => {
  const options = {
    withCancel: true,
    method: 'GET',
    url: '/tickets/fault/v1/list-complaint/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getSymptomp = (params) => {
  const options = {
    params,
    withCancel: true,
    method: 'GET',
    url: 'tickets/fault/v1/list-category-symptomp/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getUrgency = () => {
  const options = {
    withCancel: true,
    method: 'GET',
    url: '/tickets/fault/v1/list-urgency/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const submitValidation = (payload, id) => {
  const options = {
    withCancel: true,
    method: 'PUT',
    data: payload,
    url: `/tickets/fault/v2/ticket/internal/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const rejectTicket = (data) => {
  const options = {
    data,
    method: 'PUT',
    url: `/tickets/fault/v2/ticket-reject/internal`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDummySid = (params) => {
  const options = {
    params,
    method: 'GET',
    url: `/tickets/fault/v2/list-dummy-sid/internal`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailDummy = (params) => {
  const options = {
    params,
    method: 'GET',
    url: `/tickets/fault/v2/detail-dummy-sid/internal`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailGeneralProduct = (id) => {
  const options = {
    params: {
      referenceId: id,
    },
    method: 'GET',
    url: `/tickets/fault/v1/ticket/detail/internal`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getHistoryGeneralProduct = (id) => {
  const options = {
    params: {
      referenceId: id,
    },
    method: 'GET',
    url: `/tickets/fault/v1/ticket/history/internal`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const logTracking = () => {
  const options = {
    method: 'GET',
    url: `/tickets/fault/v1/geo-tracking`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const downloadList = (params) => {
  const options = {
    params: params,
    method: 'GET',
    url: '/tickets/fault/v1/list-download/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListStatus = (referenceId) => {
  const options = {
    params: {
      referenceId,
    },
    method: 'GET',
    url: '/tickets/fault/v1/activity/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListActivity = (referenceId, status) => {
  const options = {
    params: {
      referenceId,
      status,
    },
    method: 'GET',
    url: '/tickets/fault/v1/child-activity/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListCustomer = (params) => {
  const options = {
    params,
    method: 'GET',
    url: '/tickets/fault/v2/internal/customer',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListSidCreate = (params) => {
  const options = {
    params,
    method: 'GET',
    url: '/tickets/fault/v2/internal/sid',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const updateActivity = (data) => {
  const options = {
    data,
    method: 'PUT',
    url: '/tickets/fault/v1/activity/internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const uploadFileGeneral = (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('folderKey', 'evidence-activity-general-product');

  const options = {
    data,
    method: 'POST',
    url: '/tickets/generals-mycarrier/v1/upload-file',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const submitCreate = (payload) => {
  const options = {
    withCancel: true,
    method: 'POST',
    data: payload,
    url: `/tickets/fault/v1/internal`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
