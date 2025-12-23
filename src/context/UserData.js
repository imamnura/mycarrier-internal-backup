import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { key } from '@configs';

const UserDataContext = createContext({
  data: null,
});

const Provider = UserDataContext.Provider;

export const UserDataProvider = (props) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(key.storageName.userData));
    setUserData(data);
  }, []);

  return (
    <Provider
      value={{
        data: userData,
        setUserData: setUserData,
      }}
    >
      {props.children}
    </Provider>
  );
};

UserDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserDataContext;
