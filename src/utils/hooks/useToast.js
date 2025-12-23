import Toast from '@components/Toast';
import { useSnackbar } from 'notistack';

const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const setSuccessToast = (message) =>
    enqueueSnackbar(message, {
      content: (key) => <Toast id={key} variant="success" message={message} />,
    });

  const setErrorToast = (message) =>
    enqueueSnackbar(message, {
      content: (key) => <Toast id={key} variant="error" message={message} />,
    });

  return {
    setSuccessToast,
    setErrorToast,
  };
};

export default useToast;
