import { useState, useEffect } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import validation from '../validation';
import {
  uploadFile,
  reuploadDocument,
} from '../../../../_repositories/repositories';
import { useForm } from 'react-hook-form';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = (props) => {
  const { data, fetchDetail, setModalReupload, id, modalReupload } = props;

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setLoadingAlert, setSuccessAlert, setFailedAlert } = usePopupAlert();
  const [file, setFile] = useState(null);

  const { control, handleSubmit, setValue, formState, reset } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const reuploadDoc = async (payload, file) => {
    const data_ = {
      ...payload,
      ...file,
      oldFileName: data?.documents[modalReupload?.i]?.fileName,
    };

    try {
      await reuploadDocument(id, data_);
      setSuccessAlert({
        message: 'Monthly report successfully reuploaded',
        onClose: () => fetchDetail(id),
      });
    } catch (e) {
      setFailedAlert({
        message:
          'Monthly report failed to reupload. Please input valid document.',
      });
    }
  };

  const uploadDocument = async (payload, callback) => {
    let formData = new FormData();
    formData.append('file', payload.file);

    try {
      setLoadingAlert();
      let formData = new FormData();
      formData.append('file', file.file);
      const res = await uploadFile(formData);
      if (res.data) {
        callback(res.data);
      }
    } catch (e) {
      setFailedAlert({ message: 'Monthly report failed to reupload' });
    }
  };

  const handleReupload = (values) => {
    const confirmation = {
      message: 'Are you sure want to reupload this document?',
      action: [
        {
          children: 'No',
          variant: 'ghost',
          onClick: closeConfirmation,
        },
        {
          children: 'Yes',
          onClick: () => {
            uploadDocument(values, (file) => reuploadDoc(values, file));
            closeConfirmation();
          },
        },
      ],
    };

    setConfirmation(confirmation);
    setModalReupload(null);
  };

  const onClose = () => {
    setModalReupload(null);
    closeConfirmation();
  };

  useEffect(() => {
    if (!modalReupload) {
      reset({ note: '' });
      setFile(null);
    }
  }, [modalReupload]);

  return {
    data,
    control,
    handleSubmit,
    setValue,
    file,
    formState,
    setFile,
    handleReupload,
    onClose,
  };
};

export default useActions;
