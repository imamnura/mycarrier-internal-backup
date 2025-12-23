import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { route } from '@configs';
import { getAccessToken } from '@utils/common';
import UserDataContext from '@context/UserData';

const AfterLogin = ({ containers, privileges: _pageIdentifier }) => {
  const Containers = containers;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!getAccessToken()) {
      // clearStorage();
      location.href = route.login();
    } else {
      setMounted(true);
    }

    return () => setMounted(false);
  }, []);

  const { data } = useContext(UserDataContext);

  const pageIdentifier = Array.isArray(_pageIdentifier)
    ? _pageIdentifier
    : [_pageIdentifier];

  const feature = pageIdentifier
    .filter((privilege) => privilege) // Filter out undefined values
    .flatMap(({ category, page }) => {
      const cat = data?.privileges?.find(
        ({ category: catCategory }) => catCategory === category,
      );
      const menu = cat?.feature.find(({ name }) => name === page);
      return menu?.function || [];
    });

  if (!mounted) {
    return null;
  }

  // if (!feature.length) {
  if (!feature.length && pageIdentifier[0]?.category == 'BILLS_AND_PAYMENT') {
    location.href = '/unauthorize';
    return null;
  }

  return <Containers feature={feature} />;
};

AfterLogin.defaultProps = { hideNavigation: false, privileges: {} };

AfterLogin.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  containers: PropTypes.any.isRequired,
  hideNavigation: PropTypes.bool,
  privileges: PropTypes.object,
};

export default AfterLogin;
