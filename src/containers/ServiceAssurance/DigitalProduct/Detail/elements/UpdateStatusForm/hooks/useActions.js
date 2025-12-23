import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { fetchApproveTicket } from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';
import { getSuccessMessageNeucloud } from '../../../utils';
import validation from '../yupResolver';

const useActions = (props) => {
  const { setModalStatus, detail } = props;

  const router = useRouter();
  const {
    query: { id: referenceId },
  } = router;

  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const { control, handleSubmit, formState } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const handleUpdateStatus = (formType, values) => async () => {
    setLoadingAlert();
    closeConfirmation();

    const payload =
      {
        updateStatus: {
          referenceId,
          note: values.note,
          status: detail.status,
        },
        updateProgress: {
          referenceId,
          note: values.note,
          status: '',
        },
      }[formType] || {};

    try {
      await fetchApproveTicket(payload);

      setSuccessAlert({
        message: getSuccessMessageNeucloud('UpdateStatus'),
        onClose: () => router.reload(),
      });
    } catch (err) {
      setFailedAlert({
        message: err?.message,
      });
    }
  };

  const confirmationStatus = (val) => {
    const confirmation = {
      message: 'Are you sure want to update status this issue?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: handleUpdateStatus('updateStatus', val) },
      ],
    };

    setConfirmation(confirmation);
    setModalStatus(false);
  };

  const confirmationProgress = (val) => {
    const confirmation = {
      message: 'Are you sure want to give note this issue?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: handleUpdateStatus('updateProgress', val) },
      ],
    };

    setConfirmation(confirmation);
    setModalStatus(false);
  };

  const onClose = () => {
    setModalStatus(false);
    closeConfirmation();
  };

  return {
    control,
    formState,
    handleSubmit,
    confirmationStatus,
    confirmationProgress,
    onClose,
    handleUpdateStatus, //for testing
  };
};

export default useActions;
