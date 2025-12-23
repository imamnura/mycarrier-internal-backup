import fetch from '@utils/fetch';

export const getDataMicrositeBAKES = (params, accessToken) => {
  const options = {
    method: 'GET',
    url: `/mycarrier-quotation/bakes/v2/without-login`,
    headers: {
      Authorization: accessToken,
    },
    params,
  };
  return fetch(options);
};

export const updateStatusPurchaseOrder = (payload, accessToken) => {
  const options = {
    data: payload,
    method: 'PUT',
    url: `/mycarrier-quotation/bakes/v2/without-login`,
    headers: {
      Authorization: accessToken,
    },
  };
  return fetch(options);
};

export const postOTPApproval = (type, bakesId, accessToken) => () => {
  const url = {
    send: 'mycarrier-quotation/bakes/v2/without-login/send-otp',
    reSend: 'mycarrier-quotation/bakes/v2/without-login/resend-otp',
  }[type];

  const options = {
    data: {
      bakesId,
    },
    method: 'POST',
    url: url,
    headers: {
      Authorization: accessToken,
    },
  };
  return fetch(options);
};

export const postVerificationOTPApproval = (data, accessToken) => {
  const options = {
    data,
    url: 'mycarrier-quotation/bakes/v2/without-login/verification',
    method: 'POST',
    headers: {
      Authorization: accessToken,
    },
  };
  return fetch(options);
};
