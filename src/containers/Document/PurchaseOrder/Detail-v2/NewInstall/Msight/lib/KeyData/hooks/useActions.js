import { useState } from 'react';
import { useSnackbar } from 'notistack';

const useActions = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [hidden, setHidden] = useState({ 0: true, 1: true });

  const copyToClipboard = (val, label) => () => {
    navigator.clipboard.writeText(val);
    enqueueSnackbar(`Successfully copied ${label}!`, {
      variant: 'default',
      autoHideDuration: 1000,
    });
  };

  return {
    hidden,
    setHidden,
    copyToClipboard,
  };
};

export default useActions;
