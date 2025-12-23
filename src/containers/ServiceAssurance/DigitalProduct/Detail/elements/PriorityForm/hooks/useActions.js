import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  getListLevel,
  fetchApproveTicket,
} from '@containers/ServiceAssurance/DigitalProduct/_repositories/repositories';
import validation from '../validation';

const useActions = (props) => {
  const { modalPriorityForm, setModalPriorityForm, detail } = props;

  const router = useRouter();
  const {
    query: { id: referenceId },
  } = router;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [levelOptions, setLevelOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(false);

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const fetchLevel = async () => {
    setLoadingOptions(true);
    try {
      const { data } = await getListLevel();
      setLevelOptions(data);
    } catch {
      setLevelOptions([]);
    } finally {
      setLoadingOptions(false);
    }
  };

  useEffect(() => {
    if (modalPriorityForm) {
      fetchLevel();
    }
    return () => {
      setLevelOptions([]);
      reset();
    };
  }, [modalPriorityForm]);

  const onFetchUpdateStatus = async (values) => {
    const payload = {
      referenceId,
      ticketId: detail?.ticketId,
      status: detail?.status,
      priority: {
        value: values?.level,
        label: levelOptions.find((e) => e.value === values.level).label,
      },
    };

    closeConfirmation();
    setLoadingAlert();

    try {
      await fetchApproveTicket(payload);

      setSuccessAlert({
        message: modalPriorityForm?.success,
        onClose: () => router.reload(),
      });
    } catch (err) {
      setFailedAlert({
        message: err?.message,
      });
    }
  };

  const onSubmit = (values) => {
    const confirmation = {
      message: modalPriorityForm?.confirmation,
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: () => onFetchUpdateStatus(values) },
      ],
    };

    setConfirmation(confirmation);
    setModalPriorityForm(false);
  };

  const onClose = () => {
    setModalPriorityForm(false);
    closeConfirmation();
  };

  return {
    modalPriorityForm,
    onClose,
    handleSubmit,
    onSubmit,
    control,
    formState,
    loadingOptions,
    levelOptions,
  };
};

export default useActions;
