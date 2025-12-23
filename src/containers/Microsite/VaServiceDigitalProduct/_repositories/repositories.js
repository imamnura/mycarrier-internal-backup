import fetch from '@utils/fetch';
import generateToken from '@utils/generateToken';

export const getDetailVaService = (referenceId, accessToken, params) => {
  const options = {
    params,
    method: 'GET',
    url: `/tickets/digital-product/v1/microsite/${referenceId}`,
    headers: {
      Authorization: accessToken,
    },
  };
  return fetch(options);
};

export const postOTPVaService = (type, receiver) => async () => {
  const url = {
    send: '/tickets/digital-product/v1/microsite/send-otp',
    reSend: '/tickets/digital-product/v1/microsite/send-otp',
  }[type];

  const getToken = await generateToken();

  const options = {
    data: {
      userId: receiver,
    },
    method: 'POST',
    url: url,
    headers: {
      Authorization: getToken,
    },
  };
  return fetch(options);
};

export const postVerificationOTPVaService = (data, accessToken) => {
  const options = {
    data,
    url: '/tickets/digital-product/v1/microsite/validate-otp',
    method: 'POST',
    headers: {
      Authorization: accessToken,
    },
  };
  return fetch(options);
};

export const postUpdateStatusVaService = (data, accessToken) => {
  const options = {
    data,
    url: '/tickets/digital-product/v1/microsite',
    method: 'PUT',
    headers: {
      Authorization: accessToken,
    },
  };
  return fetch(options);
};

export const getListStatusVaService = async (accessToken) => {
  const options = {
    method: 'GET',
    url: `/tickets/digital-product/v1/microsite/list-status`,
    headers: {
      Authorization: accessToken,
    },
  };
  return await fetch(options);
};

export const uploadFileEvidence = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('folderKey', 'evidence-activity-general-product');

  const getToken = await generateToken();

  const options = {
    data,
    method: 'POST',
    url: '/tickets/generals-mycarrier/v1/microsite/upload-file',
    headers: {
      Authorization: getToken,
    },
  };

  return await fetch(options);
};
