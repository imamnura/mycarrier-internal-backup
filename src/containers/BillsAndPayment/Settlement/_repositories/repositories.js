import fetch from '@utils/fetch';
import { getAccessToken } from '@utils/common';
import { key } from '@configs';

export const getListSettlement = (opt, tab) => {
  const url = {
    settlement: '/mycarrier-quotation/internal/settlement/v1/list',
    users: '/mycarrier-quotation/internal/settlement/v1/users',
  }[tab];
  const options = {
    ...opt,
    method: 'GET',
    url,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailUsers = ({ periode, userId }) => {
  const options = {
    params: {
      periode,
      userId,
    },
    method: 'GET',
    url: `/mycarrier-quotation/internal/settlement/v1/users/${userId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailSettlementList = (id) => {
  const options = {
    method: 'GET',
    url: `/mycarrier-quotation/internal/settlement/v1/${id}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
export const generateSettlement = (data) => {
  const options = {
    data,
    method: 'POST',
    url: `/mycarrier-quotation/internal/settlement/v1/generate`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const downloadPdf = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/mycarrier-quotation/internal/settlement/v1/users/generate-doc`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const updateStatusSettlementList = (settlementId, data) => {
  const options = {
    data,
    method: 'PUT',
    url: `/mycarrier-quotation/internal/settlement/v1/${settlementId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
export const reassignCustomer = (settlementId, data) => {
  const options = {
    data,
    method: 'PUT',
    url: `/mycarrier-quotation/internal/settlement/v1/reassign/${settlementId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postUploadFile = (settlementId) => (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('settlementId', settlementId);
  data.append('type', 'mom');
  const options = {
    data,
    method: 'POST',
    url: '/mycarrier-quotation/internal/settlement/v1/upload-file-internal',
    headers: {
      Authorization: getAccessToken(),
    },
  };

  return fetch(options);
};

export const generateDocument = (settlementId, data) => {
  const options = {
    params: {
      settlementId,
    },
    data,
    method: 'POST',
    url: '/mycarrier-quotation/internal/settlement/v1/generate-doc',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getManagerPosition = () => {
  const options = {
    method: 'GET',
    url: '/mycarrier-quotation/bakes/v1/telkom-pic',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailApprovalSettlement = (hash) => {
  const options = {
    method: 'GET',
    url: `/mycarrier-quotation/settlement/v1/without-login/${hash}`,
    headers: {
      Authorization: key.basicAuth,
    },
  };
  return fetch(options);
};

export const updateApprovalSettlement = (hash, data) => {
  const options = {
    data,
    url: `/mycarrier-quotation/settlement/v1/without-login/nde-status/${hash}`,
    method: 'PUT',
    headers: {
      Authorization: key.basicAuth,
    },
  };
  return fetch(options);
};

export const getListRecepientCC = (settlementId) => {
  const options = {
    method: 'GET',
    url: `/mycarrier-quotation/settlement/v1/carbon-copy/${settlementId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getListEmployeeCC = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: `/mycarrier-quotation/settlement/v1/employees`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postAddCC = (data) => {
  const options = {
    data,
    method: 'POST',
    url: '/mycarrier-quotation/settlement/v1/carbon-copy',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const deleteCC = (data) => {
  const options = {
    data,
    method: 'DELETE',
    url: '/mycarrier-quotation/settlement/v1/carbon-copy',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};
