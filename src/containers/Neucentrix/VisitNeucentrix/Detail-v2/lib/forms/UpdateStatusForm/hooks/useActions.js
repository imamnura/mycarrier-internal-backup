import { useEffect } from 'react';
import { updateStepVisitNcx } from '../../../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import validation from '../validation';
import { useForm } from 'react-hook-form';

const useActions = (props) => {
  const { fetchDetail, modalUpdateStatus, setModalUpdateStatus, id } = props;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [modalUpdateStatus]);

  const fetchUpdateStatus = async (visitId, payload) => {
    const data = {
      ...payload,
      status: modalUpdateStatus?.updateTo,
      rejectBy: modalUpdateStatus?.rejectBy,
    };

    closeConfirmation();
    setLoadingAlert();

    try {
      await updateStepVisitNcx(visitId, data);
      setSuccessAlert({
        message: modalUpdateStatus?.success,
        onClose: () => fetchDetail(visitId),
      });
    } catch (e) {
      setFailedAlert({
        message: e.message,
      });
    }
  };

  const handleUpdateStatus = (values) => {
    const confirmation = {
      message: modalUpdateStatus?.confirmation,
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'Yes',
          onClick: () => {
            fetchUpdateStatus(id, values);
            closeConfirmation();
          },
        },
      ],
    };

    setConfirmation(confirmation);
    setModalUpdateStatus(false);
  };

  const onClose = () => {
    setModalUpdateStatus(false);
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
