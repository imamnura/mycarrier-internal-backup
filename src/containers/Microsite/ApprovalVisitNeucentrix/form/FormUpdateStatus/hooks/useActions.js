import validation from '../validation';
import { useForm } from 'react-hook-form';

const useActions = (props) => {
  const {
    clearConfirmation,
    modalUpdateStatus,
    setModalUpdateStatus,
    setConfirm,
    fetchUpdateStatus,
  } = props;

  const { confirmation: confirmationText, type: _type } = modalUpdateStatus;

  const { control, handleSubmit, setValue, formState } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const handleUpdateStatus = (values) => {
    const type = {
      am: 'account_manager',
      marketing: 'marketing',
      occ: 'occ',
    }[_type];

    const payload = {
      ...values,
      status: 'rejected',
      type,
    };
    const confirmation = {
      content: confirmationText,
      actions: [
        { label: 'No', action: () => clearConfirmation() },
        {
          label: 'Yes',
          action: () => {
            fetchUpdateStatus(payload);
            clearConfirmation();
          },
        },
      ],
    };

    setConfirm(confirmation);
    setModalUpdateStatus(false);
  };

  const onClose = () => {
    setModalUpdateStatus(false);
    clearConfirmation();
  };

  return {
    control,
    formState,
    handleSubmit,
    setValue,
    fetchUpdateStatus,
    handleUpdateStatus,
    onClose,
  };
};

export default useActions;
