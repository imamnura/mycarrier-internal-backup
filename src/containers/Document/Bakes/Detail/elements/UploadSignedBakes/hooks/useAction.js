import { useForm } from 'react-hook-form';
import validation from '../validation';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useAction = (props) => {
  const { control, handleSubmit } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const submitToFetch = (value) => () => {
    closeConfirmation();
    props.onSubmit(value);
  };

  const onSubmit = (value) => {
    setConfirmation({
      message: 'Are you sure want to submit this document?',
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: submitToFetch(value) },
      ],
    });
  };

  return {
    control,
    onSubmit,
    handleSubmit,
    submitToFetch,
  };
};

export default useAction;
