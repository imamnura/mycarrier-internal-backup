import { key } from '@configs';
import { getFirebaseToken } from '@firebaseConfig/utils';
import fetch from '@utils/fetch';

// Login
export const verifyCaptcha = (clientToken) => {
  const options = {
    data: {
      clientToken,
    },
    method: 'POST',
    url: '/users-management/v2/auth/verifycaptcha',
    headers: {
      Authorization: key.basicAuth,
    },
  };
  return fetch(options);
};

export const login = (data, accessToken, accessKey) => {
  const options = {
    data,
    method: 'POST',
    url: '/users-management/v2/auth/login',
    headers: {
      Authorization: accessToken,
      nameApp: 'mycarrier',
      'access-key': accessKey,
    },
  };
  return fetch(options);
};

export const subscribeNotification = (accessToken) => {
  const options = {
    data: {
      firebaseToken: getFirebaseToken(),
    },
    method: 'POST',
    url: '/users/user/v2/subscribe-topic',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(options);
};

// Forgot Password
export const forgotPasssword = (data, accessToken) => {
  const options = {
    data,
    method: 'POST',
    url: '/users-management/v2/auth/reset-password',
    headers: {
      Authorization: accessToken,
    },
  };
  return fetch(options);
};

export const verifyCodeReset = (data, accessToken) => {
  const options = {
    data,
    method: 'POST',
    url: '/users-management/v2/auth/verify-code',
    headers: {
      Authorization: accessToken,
    },
  };
  return fetch(options);
};

export const changePassword = (data, accessToken) => {
  const options = {
    data,
    method: 'PUT',
    url: '/users-management/v2/auth/reset-password',
    headers: {
      Authorization: accessToken,
    },
  };
  return fetch(options);
};
