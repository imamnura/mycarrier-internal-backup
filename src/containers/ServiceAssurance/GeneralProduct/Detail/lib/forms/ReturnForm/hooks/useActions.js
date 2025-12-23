// import { useEffect } from 'react';
import { rejectTicket } from '../../../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import validation from '../validation';
import { useForm } from 'react-hook-form';

const useActions = (props) => {
  const { fetchDetail, modalReturn, setModalReturn, idOGD, refId } = props;

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
  // }, [modalReturn]);

  const fetchUpdateStatus = async (idOGD, refId, values) => {
    const payload = new FormData();
    payload.append('idOGD', idOGD);
    payload.append('referenceId', refId);
    payload.append('reason', values.note);
    payload.append('fileReject', values.media.file);
    setLoadingAlert();

    try {
      await rejectTicket(payload);
      setSuccessAlert({
        message: modalReturn?.success,
        onClose: () => fetchDetail(refId),
      });
    } catch (e) {
      setFailedAlert({
        message: e.message,
      });
    }
    closeConfirmation();
    reset();
  };

  const handleUpdateStatus = (values) => {
    const confirmation = {
      message: modalReturn?.confirmation,
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'Yes',
          onClick: () => {
            fetchUpdateStatus(idOGD, refId, values);
            closeConfirmation();
          },
        },
      ],
    };

    setConfirmation(confirmation);
    setModalReturn(false);
  };

  const onClose = () => {
    setModalReturn(false);
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
