import { useEffect } from 'react';
import {
  updateStatusBaso,
  uploadFile,
} from '../../../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import validation from '../validation';
import { useForm } from 'react-hook-form';

const useActions = (props) => {
  const {
    fetchDetail: _fetchDetail,
    modalReturn,
    setModalReturn,
    setModalProgressUpload,
    setProgress,
    id,
  } = props;

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
  }, [modalReturn]);

  const fetchDetail = (orderNumber) => () => _fetchDetail(orderNumber);

  const fetchUpdateStatus = async (payload, file) => {
    const data = {
      status: modalReturn?.updateTo,
      note: payload?.note,
      fileReturnName: file?.fileName,
      fileReturnUrl: file?.fileUrl,
    };

    closeConfirmation();
    setLoadingAlert();

    try {
      await updateStatusBaso(id, data);
      setSuccessAlert({
        message: modalReturn?.success,
        onClose: fetchDetail(id),
      });
    } catch (e) {
      setFailedAlert({
        message: e.message,
      });
    }
  };

  const fetchUploadDocument = (payload) => async () => {
    let formData = new FormData();
    formData.append('file', payload?.media?.file);
    formData.append('orderNumber', id);
    formData.append('status', 'return');

    setModalProgressUpload(true);

    try {
      const res = await uploadFile(formData, setProgress);
      if (res.data) {
        setTimeout(() => {
          setProgress(0);
        }, 1000);

        fetchUpdateStatus(payload, res.data);
        setModalProgressUpload(false);
      }
    } catch (e) {
      setFailedAlert({ message: 'Document failed to upload' });
      setModalProgressUpload(false);
    }
  };

  const handleUpdateStatus = (values) => {
    const confirmation = {
      message: modalReturn?.confirmation,
      action: [
        {
          children: 'No',
          onClick: closeConfirmation,
          variant: 'ghost',
        },
        {
          children: 'Yes',
          onClick: fetchUploadDocument(values),
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
    fetchDetail,
    fetchUpdateStatus,
    fetchUploadDocument,
    formState,
    handleSubmit,
    handleUpdateStatus,
    onClose,
  };
};

export default useActions;
