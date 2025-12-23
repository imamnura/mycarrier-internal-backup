import { SERVICES, AUTH } from '../configs';
import fetch from './fetch';
import jwtDecode from 'jwt-decode';
import { setGenerateToken, getGenerateToken } from '../../utils/common';

const generateToken = (callback) => {
  const token = getGenerateToken();
  const data = token && jwtDecode(token);

  if (data && data.exp > Date.now() / 1000) {
    return callback(`Bearer ${token}`);
  } else {
    const options = {
      method: 'POST',
      url: SERVICES.GENERATE_TOKEN,
      data: AUTH.GENERATE,
    };
    fetch(options)
      .then(({ data: { accessToken } }) => {
        callback(`Bearer ${accessToken}`);
        setGenerateToken(accessToken);
      })
      .catch(() => {
        callback(null);
      });
  }
};

export default generateToken;
