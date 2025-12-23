import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { fetchApproveTicket } from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';

const useActions = (props) => {
  const { setModalReport, fetchDetail } = props;

  const router = useRouter();
  const {
    query: { id: referenceId },
  } = router;

  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const updateTicket = (values) => async () => {
    setLoadingAlert();
    closeConfirmation();

    try {
      await fetchApproveTicket(values);
      setSuccessAlert({
        message: 'Ticket succesfully closed & reported',
        onClose: () => fetchDetail(),
      });
    } catch (err) {
      setFailedAlert({
        message: err?.message || 'Failed to close & report CDNaaS ticket',
      });
    }
  };

  const onClose = () => {
    setModalReport(null);
    reset({});
  };

  const onSubmit = (val) => {
    const payload = {
      ...val,
      referenceId,
      action: 'close',
      evidence: val.evidence.map(({ data: { fileName, fileUrl } }) => ({
        fileName,
        fileUrl,
      })),
    };

    const confirmation = {
      message: 'Are you sure want to close & report this ticket?',
      action: [
        {
          children: 'No',
          variant: 'ghost',
          onClick: closeConfirmation,
        },
        {
          children: 'Yes',
          onClick: updateTicket(payload),
        },
      ],
    };

    setConfirmation(confirmation);
    onClose();
  };

  return {
    control,
    formState,
    handleSubmit,
    onSubmit,
    onClose,
    updateTicket, //for testing
  };
};

export default useActions;
