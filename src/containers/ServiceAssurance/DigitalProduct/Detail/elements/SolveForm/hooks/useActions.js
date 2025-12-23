import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { fetchApproveTicket } from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';
import { cleanObject } from '@utils/common';

const useActions = (props) => {
  const { setModalSolve, fetchDetail } = props;

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

  const updateTicket = async (values) => {
    setLoadingAlert();
    closeConfirmation();

    try {
      await fetchApproveTicket(values);
      setSuccessAlert({
        message: 'Ticket succesfully solved',
        onClose: () => fetchDetail(),
      });
    } catch (err) {
      setFailedAlert({
        message: err?.message || 'Failed to solve this ticket',
      });
    }
  };

  const onClose = () => {
    setModalSolve(false);
    reset({});
  };

  const onSubmit = (val) => {
    const payload = {
      ...val,
      referenceId,
      action: 'solve',
      evidence:
        val.evidence &&
        val.evidence.map(({ data: { fileName, fileUrl } }) => ({
          fileName,
          fileUrl,
        })),
    };

    const confirmation = {
      message: 'Are you sure want to solve this ticket?',
      action: [
        {
          children: 'No',
          variant: 'ghost',
          onClick: () => {
            setModalSolve(true);
            closeConfirmation();
          },
        },
        {
          children: 'Yes',
          onClick: () => {
            onClose();
            updateTicket(cleanObject(payload));
          },
        },
      ],
    };

    setConfirmation(confirmation);
    setModalSolve(false);
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
