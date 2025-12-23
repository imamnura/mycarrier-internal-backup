import fetch from '@utils/fetch';

export const sendOtpMFA = (opt = {}) => {
  const options = {
    ...opt,
    method: 'POST',
    url: '/users-management/v2/auth/otp-mfa',
  };
  return fetch(options);
};

export const verifyOtpMfa = (opt = {}) => {
  const options = {
    ...opt,
    method: 'POST',
    url: '/users-management/v2/auth/otp-mfa-verify',
  };
  return fetch(options);
};
