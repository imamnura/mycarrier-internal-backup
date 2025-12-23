import fetch from '@utils/fetch';
import { key } from '@configs';
import { getAccessToken } from '@utils/common';

export const getListOfferingLetter = (opt) => {
  const options = {
    ...opt,
    method: 'GET',
    url: '/mycarrier-quotation/offering-letter/v1',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getDetailOfferingLetter = (offeringLetterId) => {
  const options = {
    method: 'GET',
    url: `/mycarrier-quotation/offering-letter/v1/${offeringLetterId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const updateStatusOfferingLetter = ({ offeringLetterId, data }) => {
  const options = {
    data,
    method: 'PUT',
    url: `/mycarrier-quotation/offering-letter/v1/status/${offeringLetterId}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getOptionsCompanyName = () => {
  const options = {
    params: {
      segment: 'mycarrier',
      nipnas: '',
      custAccntNum: '',
      name: '',
    },
    method: 'GET',
    url: 'users-management/v2/customer-account',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postDraftOfferingLetter = (id, data) => {
  const options = {
    data,
    method: id ? 'PUT' : 'POST',
    url: `/mycarrier-quotation/offering-letter/v1/draft${id ? `/${id}` : ''}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const generateOfferingLetter = (offeringLetterId) => {
  const options = {
    data: { offeringLetterId },
    method: 'POST',
    url: '/mycarrier-quotation/offering-letter/v1/generate',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getOptionsServiceName = () => {
  const options = {
    params: {
      size: 9999,
      sort: 'asc',
      page: 1,
    },
    method: 'GET',
    url: 'mycarrier-quotation/epics/v1/service-product',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getAutoForm = (service) => {
  const options = {
    method: 'GET',
    url: `/mycarrier-quotation/epics/v2/service-form/${service}`,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postOTP = ({ type, offeringLetterId }) => {
  const url = {
    send: 'mycarrier-quotation/offering-letter/v1/send-otp',
    reSend: 'mycarrier-quotation/offering-letter/v1/resend-otp',
  }[type];

  const options = {
    data: {
      offeringLetterId,
    },
    method: 'POST',
    url: url,
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postVerificationOTP = (data) => {
  const options = {
    data,
    url: 'mycarrier-quotation/offering-letter/v1/verification',
    method: 'POST',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const getSelectOptions = (url) => {
  const options = {
    url,
    method: 'GET',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

export const postPricingAutoForm = (data) => {
  const options = {
    data,
    url: 'mycarrier-quotation/epics/v2/service-price',
    method: 'POST',
    headers: {
      Authorization: getAccessToken(),
    },
  };
  return fetch(options);
};

// Approval

export const getDetailApprovalOfferingLetter = (hash) => {
  const options = {
    url: `mycarrier-quotation/offering-letter/v1/without-login/${hash}`,
    method: 'GET',
    headers: {
      Authorization: key.basicAuth,
    },
  };
  return fetch(options);
};

export const putApprovalOfferingLetter = (hash, data) => {
  const options = {
    data,
    url: `mycarrier-quotation/offering-letter/v1/without-login/${hash}`,
    method: 'PUT',
    headers: {
      Authorization: key.basicAuth,
    },
  };
  return fetch(options);
};

export const postOTPApproval = (type, offeringLetterId) => () => {
  const url = {
    send: 'mycarrier-quotation/offering-letter/v1/without-login/send-otp',
    reSend: 'mycarrier-quotation/offering-letter/v1/without-login/resend-otp',
  }[type];

  const options = {
    data: {
      offeringLetterId,
    },
    method: 'POST',
    url: url,
    headers: {
      Authorization: key.basicAuth,
    },
  };
  return fetch(options);
};

export const postVerificationOTPApproval = (data) => {
  const options = {
    data,
    url: 'mycarrier-quotation/offering-letter/v1/without-login/verification',
    method: 'POST',
    headers: {
      Authorization: key.basicAuth,
    },
  };
  return fetch(options);
};
