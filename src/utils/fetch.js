import axios from 'axios';
import { SERVICES } from '../__old/configs';
import { baseUrl } from '../configs';
import generateToken from './generateToken';
import {
  getAccessToken,
  getRefreshToken,
  logout,
  setAccessToken,
  setRefreshToken,
} from './common';

const defaultError = {
  code: 500,
  status: 'error',
  message: 'Failed to fetch data. Please contact developer.',
};

const CancelToken = axios.CancelToken;

let cancel = {};

const fetch = ({ withCancel, ...opt }) => {
  if (cancel[opt.url] !== undefined && withCancel) {
    cancel[opt.url]();
  }

  const options = {
    baseURL: baseUrl,
    cancelToken: new CancelToken(function executor(c) {
      cancel[opt.url] = c;
    }),
    ...opt,
  };

  return new Promise((resolve, reject) => {
    axios(options)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          // do nothing
        } else if (typeof err.response === 'undefined') {
          reject(defaultError);
        } else if (typeof err.response.data === 'undefined') {
          reject(defaultError);
        } else if (
          [
            'Access token expired!',
            'Token is expired',
            'Basic token expired!',
          ].includes(err.response.data.message)
        ) {
          onRefreshToken(options, resolve, reject);
        } else {
          reject(err.response.data);
        }
      });
  });
};

const onRefreshToken = async (opt, resolve, reject) => {
  try {
    const refreshTokenSuccess = await refreshToken();
    if (refreshTokenSuccess) {
      const result = await axios({
        ...opt,
        headers: {
          Authorization: getAccessToken(),
        },
      });
      resolve(result.data);
    }
  } catch (error) {
    reject(error?.response?.data || defaultError);
  }
};

export const refreshToken = async () => {
  try {
    const tokenGenerate = await generateToken();

    const options = {
      method: 'POST',
      url: SERVICES.REFRESH_TOKEN,
      data: {
        refreshToken: getRefreshToken(),
      },
      headers: {
        Authorization: tokenGenerate,
      },
    };

    const result = await axios(options);

    const { accessToken, refreshToken } = result.data?.data || {};
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    return true;
  } catch (error) {
    logout();
    return false;
  }
};

export const cancelRequestToken = () => {
  return axios.CancelToken.source();
};

export default fetch;
