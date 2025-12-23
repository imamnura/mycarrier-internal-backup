import { useContext } from 'react';
import PopupConfirmationContext from '../../context/PopupConfirmation';

const usePopupConfirmation = () => {
  const { data: confirmationData, setData } = useContext(
    PopupConfirmationContext,
  );

  const setConfirmation = (property) => {
    const {
      message = '',
      action = [],
      variant = '',
      description = '',
      note = '',
      fitToContent = false,
    } = property || {};

    setData({
      action,
      message,
      variant,
      description,
      note,
      fitToContent,
    });
  };

  const closeConfirmation = () => setConfirmation();

  return {
    closeConfirmation,
    confirmationData,
    setConfirmation,
  };
};

export default usePopupConfirmation;
