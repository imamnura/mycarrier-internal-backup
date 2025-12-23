import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { updateDetailStatus } from '../../../../../_repositories/repositories';
import validation from '../validation';
import validationOnlyNote from '../validationOnlyNote';

const useActions = (props) => {
  const router = useRouter();

  const { modalReject, setModalReject, ticketId } = props;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: modalReject?.withUpload ? validation : validationOnlyNote,
    mode: 'onChange',
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [modalReject]);

  const fetchUpdateStatus = async (ticketId, values) => {
    const payload = {
      status: 'rejected',
      rejectReason: values.note,
    };

    closeConfirmation();
    setLoadingAlert();

    try {
      await updateDetailStatus(ticketId, payload);
      setSuccessAlert({
        message: modalReject?.success,
        onClose: () => router.reload(),
      });
    } catch (e) {
      setFailedAlert({
        message: e.message,
      });
    }
  };

  const handleUpdateStatus = (values) => {
    const confirmation = {
      message: modalReject?.confirmation,
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'Yes',
          onClick: () => {
            fetchUpdateStatus(ticketId, values);
            closeConfirmation();
          },
        },
      ],
    };

    setConfirmation(confirmation);
    setModalReject(false);
  };

  const onClose = () => {
    setModalReject(false);
    closeConfirmation();
  };

  return {
    control,
    formState,
    handleSubmit,
    fetchUpdateStatus,
    handleUpdateStatus,
    onClose,
  };
};

export default useActions;
