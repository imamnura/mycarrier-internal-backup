import fetch from './fetch';
import jwtDecode from 'jwt-decode';
import { key } from '../configs';
import { setGenerateToken, getGenerateToken } from './common';

const generateToken = async () => {
  const token = getGenerateToken();
  const data = token && jwtDecode(token);

  if (data && data.exp > Date.now() / 1000) {
    return `Bearer ${token}`;
  } else {
    const options = {
      method: 'POST',
      url: '/users-management/v2/auth/generatetoken',
      data: key.clientKey,
    };
    try {
      const result = await fetch(options);
      const accessToken = result.data.accessToken;
      setGenerateToken(accessToken);
      return `Bearer ${accessToken}`;
    } catch (error) {
      return null;
    }
  }
};

export default generateToken;
