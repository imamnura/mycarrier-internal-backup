import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const PopupAlertContext = createContext({
  data: {
    message: '',
    variant: 'success',
  },
  setData() {},
});

const Provider = PopupAlertContext.Provider;

export const PopupAlertProvider = (props) => {
  const [popupAlert, setPopupAlert] = useState({
    message: '',
    variant: 'success',
  });

  return (
    <Provider
      value={{
        data: popupAlert,
        setData: setPopupAlert,
      }}
    >
      {props.children}
    </Provider>
  );
};

PopupAlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PopupAlertContext;
