import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { baseRedirect, getAccessToken } from '@utils/common';

const BeforeLogin = ({ containers }) => {
  const Containers = containers;
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (getAccessToken()) {
      baseRedirect();
      setMount(false);
    } else {
      setMount(true);
    }
  }, []);

  return mount && <Containers />;
};

BeforeLogin.propTypes = {
  containers: PropTypes.func.isRequired,
};

export default BeforeLogin;
