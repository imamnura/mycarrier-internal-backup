import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const PopupConfirmationContext = createContext({
  data: {
    message: '',
    action: [],
  },
});

const Provider = PopupConfirmationContext.Provider;

export const PopupConfirmationProvider = (props) => {
  const [popupConfirmation, setPopupConfirmation] = useState({
    message: '',
    action: [],
  });

  return (
    <Provider
      value={{
        data: popupConfirmation,
        setData: setPopupConfirmation,
      }}
    >
      {props.children}
    </Provider>
  );
};

PopupConfirmationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PopupConfirmationContext;
