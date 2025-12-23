// import { useEffect } from 'react';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import validation from '../validation';
import { useForm } from 'react-hook-form';

const useActions = (props) => {
  const { fetchUpdateStatus, content, setContent } = props;

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: validation(content?.validation),
    mode: 'onChange',
  });

  // useEffect(() => {
  //   reset(content?.autofill);
  //   return () => {
  //     reset({});
  //   };
  // }, [content]);

  const onSubmit = (v) => () => {
    fetchUpdateStatus(v, content);
    closeConfirmation();
  };
  const onClose = () => {
    setContent({ ...content, open: false, autofill: null });
    closeConfirmation();
  };

  const handleUpdateStatus = (values) => {
    if (content?.confirmation) {
      const confirmation = {
        message: content?.confirmation,
        action: [
          { children: 'No', variant: 'ghost', onClick: closeConfirmation },
          { children: 'Yes', onClick: async () => {
            await onSubmit(values)();
            reset();
           } },
        ],
      };

      setConfirmation(confirmation);
    } else {
      onSubmit(values)();
    }
    setContent({ ...content, open: false });
  };

  return {
    control,
    formState,
    fetchUpdateStatus,
    handleSubmit,
    handleUpdateStatus,
    onClose,
    onSubmit,
  };
};

export default useActions;
