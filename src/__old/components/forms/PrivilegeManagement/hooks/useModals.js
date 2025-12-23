import React, { useState } from 'react';
import ConfirmationDialog from '../../../elements/ConfirmationDialog';
import CallbackAlert from '../../../elements/CallbackAlert';
import {
  defaultConfirm,
  defaultAlert,
} from '../../../../../constants/dialogDefaultValue';

const useModals = (history) => {
  const [confirmation, _setConfirmation] = useState({
    actions: [],
    content: '',
  });

  const [alert, _setAlert] = useState({
    content: '',
    success: true,
  });

  const alertClose = () => _setAlert(defaultAlert);

  const redirect = (history, url) => history.replace(url);

  const renderCallbackAlert = () => {
    if (alert.redirect) {
      return (
        <CallbackAlert
          onClose={() => redirect(history, alert.redirect)}
          {...alert}
        />
      );
    }
    return <CallbackAlert onClose={alertClose} {...alert} />;
  };

  const setAlert = (v) => _setAlert(v);

  const setConfirmation = (v) => _setConfirmation(v);

  const clearConfirmation = () => _setConfirmation(defaultConfirm);

  const renderConfirmation = () => (
    <ConfirmationDialog {...confirmation} onClose={clearConfirmation} />
  );

  return {
    renderConfirmation,
    clearConfirmation,
    setConfirmation,
    setAlert,
    renderCallbackAlert,
  };
};

export default useModals;
