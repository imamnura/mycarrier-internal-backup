import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  fetchApproveTicket,
  getUrgencyV2,
} from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';

const useActions = (props) => {
  const { setModalValidate, fetchDetail, open } = props;
  const router = useRouter();
  const {
    query: { id: referenceId },
  } = router;

  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const [loadingUrgency, setLoadingUrgency] = useState(false);
  const [urgencyOption, setUrgencyOption] = useState([]);
  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onChange',
  });

  const fetchUrgency = async () => {
    setLoadingUrgency(true);
    try {
      const result = await getUrgencyV2({
        product: 'cdnaas',
      });
      setUrgencyOption(result.data);
    } catch (error) {
      setUrgencyOption([]);
    } finally {
      setLoadingUrgency(false);
    }
  };

  const updateTicket = (values) => async () => {
    setLoadingAlert();
    closeConfirmation();

    try {
      await fetchApproveTicket(values);
      setSuccessAlert({
        message: 'Ticket succesfully validated',
        onClose: fetchDetail,
      });
    } catch (err) {
      setFailedAlert({
        message: err?.message || 'Failed to validate ticket',
      });
    }
  };

  const onSubmit = (val) => {
    const payload = {
      referenceId,
      action: 'validate',
      ...val,
    };

    const confirmation = {
      message: 'Are you sure want to validate this ticket?',
      action: [
        { children: 'No', variant: 'ghost', onClick: onClose },
        {
          children: 'Yes',
          onClick: updateTicket(payload),
        },
      ],
    };

    setConfirmation(confirmation);
    onClose();
  };

  const onClose = () => {
    setModalValidate(null);
    reset({});
  };

  useEffect(() => {
    if (open) {
      fetchUrgency();
    }
  }, [open]);

  return {
    control,
    formState,
    handleSubmit,
    onSubmit,
    onClose,
    updateTicket, //for testing
    loadingUrgency,
    urgencyOption,
  };
};

export default useActions;
