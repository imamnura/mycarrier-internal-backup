import { useEffect } from 'react';
import { addLoginData } from '../../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import validation from '../validation';
import { useForm } from 'react-hook-form';

const useActions = (props) => {
  const {
    fetchDetail: _fetchDetail,
    modalAddLoginData,
    setModalAddLoginData,
    id,
  } = props;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  useEffect(() => {
    reset({
      username: modalAddLoginData?.data?.username,
      password: modalAddLoginData?.data?.password,
    });

    return () => {
      reset();
    };
  }, [modalAddLoginData]);

  const fetchDetail = (loginDataId) => () => _fetchDetail(loginDataId);

  const fetchUpdateStatus = (payload) => async () => {
    const data = {
      loginData: {
        ...payload,
      },
    };

    closeConfirmation();
    setLoadingAlert();

    try {
      await addLoginData(id, data);
      setSuccessAlert({
        message: modalAddLoginData?.success,
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
      message: modalAddLoginData?.confirmation,
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: fetchUpdateStatus(values) },
      ],
    };

    setConfirmation(confirmation);
    setModalAddLoginData(false);
  };

  const onClose = () => {
    setModalAddLoginData(false);
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
