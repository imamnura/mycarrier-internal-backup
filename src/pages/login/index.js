import React from 'react';
import Login from '@containers/Authentication/Login';
import BeforeLogin from '@layouts/Adapter/BeforeLogin';

const LoginPages = () => {
  return <BeforeLogin containers={Login} />;
};

export default LoginPages;
