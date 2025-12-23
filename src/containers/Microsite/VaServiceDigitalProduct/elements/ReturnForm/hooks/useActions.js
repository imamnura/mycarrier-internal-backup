import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { postUpdateStatusVaService } from '../../../_repositories/repositories';
import validation from '../validation';
import validationOnlyNote from '../validationOnlyNote';
import generateToken from '@utils/generateToken';

const useActions = (props) => {
  const { fetchDetail, modalReturn, setModalReturn, referenceId } = props;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: modalReturn?.withUpload ? validation : validationOnlyNote,
    mode: 'onChange',
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [modalReturn]);

  const fetchUpdateStatus = async (referenceId, values) => {
    const payload = new FormData();
    payload.append('referenceId', referenceId);
    payload.append('note', values.note);
    payload.append('status', 'Rejected');
    modalReturn?.withUpload && payload.append('fileReject', values.media.file);

    closeConfirmation();
    setLoadingAlert();

    try {
      const accessTokenGenerate = await generateToken();
      await postUpdateStatusVaService(payload, accessTokenGenerate);
      setSuccessAlert({
        message: modalReturn?.success,
        onClose: () => fetchDetail(referenceId),
      });
    } catch (e) {
      setFailedAlert({
        message: e.message,
      });
    }
  };

  const handleUpdateStatus = (values) => {
    const confirmation = {
      message: modalReturn?.confirmation,
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'Yes',
          onClick: () => {
            fetchUpdateStatus(referenceId, values);
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
