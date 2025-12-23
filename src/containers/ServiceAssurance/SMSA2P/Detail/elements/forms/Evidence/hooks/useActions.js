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

  const { modalEvidence, setModalEvidence, ticketId } = props;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { closeConfirmation } = usePopupConfirmation();

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: modalEvidence?.withUpload ? validation : validationOnlyNote,
    mode: 'onChange',
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [modalEvidence]);

  const fetchUpdateStatus = async (values) => {
    const payload = new FormData();
    modalEvidence?.withUpload &&
      payload.append('evidenceFiles', values.media.file);
    payload.append('evidenceToCustomer', values.note);
    payload.append('status', 'technical handling');

    closeConfirmation();
    setLoadingAlert();

    try {
      await updateDetailStatus(ticketId, payload);
      setSuccessAlert({
        message: modalEvidence?.success,
        onClose: () => router.reload(),
      });
    } catch (e) {
      setFailedAlert({
        message: 'Failed to Update Data',
      });
    }
  };

  const onClose = () => {
    setModalEvidence(false);
    closeConfirmation();
  };

  return {
    control,
    formState,
    handleSubmit,
    fetchUpdateStatus,
    onClose,
  };
};

export default useActions;
