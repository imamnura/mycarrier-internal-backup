// import { useEffect } from 'react';
import { updateRequestMRTG } from '../../../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import validation from '../validation';
import { useForm } from 'react-hook-form';

const useActions = (props) => {
  const {
    fetchDetail: _fetchDetail,
    modalUpdateStatus,
    setModalUpdateStatus,
    id,
  } = props;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  // useEffect(() => {
  //   return () => {
  //     reset();
  //   };
  // }, [modalUpdateStatus]);

  const fetchDetail = (requestId) => () => _fetchDetail(requestId);

  const fetchUpdateStatus = (payload) => async () => {
    const data = {
      ...payload,
      status: modalUpdateStatus?.updateTo,
    };

    closeConfirmation();
    setLoadingAlert();

    try {
      await updateRequestMRTG(id, data);
      setSuccessAlert({
        message: modalUpdateStatus?.success,
        onClose: fetchDetail(id),
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
          onClick: async () => {
            await fetchUpdateStatus(values)();
            reset();
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
    fetchDetail,
  };
};

export default useActions;
