import { useContext } from 'react';
import PopupAlertContext from '../../context/PopupAlert';

const usePopupAlert = () => {
  const { data: alertData, setData } = useContext(PopupAlertContext);

  const _onClose = (customClose) => () => {
    if (customClose) {
      customClose();
    }

    setData({
      message: '',
      variant: 'success',
    });
  };

  const setSuccessAlert = (property) => {
    const {
      message,
      onClose,
      buttonLabel = 'Okay',
      variant,
      customAction = [],
    } = property;

    setData({
      buttonLabel,
      message,
      customAction,
      onClose: _onClose(onClose),
      variant: variant ?? 'success',
    });
  };

  const setFailedAlert = (property) => {
    const {
      message,
      onClose,
      buttonLabel = 'Okay',
      variant,
      customAction = [],
    } = property;

    setData({
      buttonLabel,
      message,
      customAction,
      onClose: _onClose(onClose),
      variant: variant ?? 'failed',
    });
  };

  const setLoadingAlert = (property) => {
    const {
      message = 'Please Wait',
      onClose,
      buttonLabel = 'Okay',
    } = property || {};

    setData({
      buttonLabel,
      message,
      onClose: _onClose(onClose),
      variant: 'loading',
    });
  };

  return {
    setFailedAlert,
    setLoadingAlert,
    setSuccessAlert,
    alertData,
    setData,
    onCloseAlert: _onClose(),
  };
};

export default usePopupAlert;
