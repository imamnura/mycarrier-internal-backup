import axios from 'axios';
import {
  logout,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  getToken,
} from './common';
import generateToken from './generateToken';
import { SERVICES } from '../configs';

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    axios(options)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        const defaultError = {
          code: 500,
          status: 'error',
          message: 'Failed to fetch data. Please contact developer.',
        };

        if (typeof err.response === 'undefined') reject(defaultError);
        else if (typeof err.response.data === 'undefined') reject(defaultError);
        else if (err.response.data.message === 'Access token expired!')
          handleRefreshToken(options, resolve, reject);
        else if (err.response.data.message === 'Token is expired')
          handleRefreshToken(options, resolve, reject);
        else reject(err.response.data);
      });
  });
}

function handleRefreshToken(options, resolve, reject) {
  refreshToken((success) => {
    if (success) {
      options = {
        ...options,
        headers: {
          Authorization: getToken(),
        },
      };
      axios(options)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    }
  });
}

function refreshToken(success) {
  generateToken((accessToken) => {
    const options = {
      method: 'POST',
      url: SERVICES.REFRESH_TOKEN,
      data: {
        refreshToken: getRefreshToken(),
      },
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(options)
      .then(({ data }) => {
        const { accessToken, refreshToken } = data;

        if (accessToken) {
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          success(true);
        } else {
          logout();
        }
      })
      .catch(() => {
        logout();
      });
  });
}

export function cancelRequestToken() {
  return axios.CancelToken.source();
}
