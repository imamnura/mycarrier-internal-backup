import { useState, useEffect } from 'react';
import validation from '../validation';
import { useForm } from 'react-hook-form';
import { fetchSubmitDocument } from '../../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { defaultConfirm } from '@constants/dialogDefaultValue';

const useActions = (props) => {
  const {
    allowed,
    setDocument,
    documentList,
    isOpen,
    initialDocument,
    setInitialDocument,
    productName,
  } = props;
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();

  const [file, setFile] = useState(null);
  const isEdit = Object.keys(initialDocument).length > 0 ? true : false;
  const [confirmation, setConfirmation] = useState({
    actions: [],
    content: '',
  });

  const { control, handleSubmit, setValue, formState } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const handleInitialFile = () => {
    setFile({ name: initialDocument.data.path.split('/').pop() });
    setValue('documentName', initialDocument.data.name);
    setValue('documentDesc', initialDocument.data.description);
  };

  const submitUpload = async (val) => {
    let temp = documentList;
    setLoadingAlert();

    if (isEdit) {
      let payloadEdit;
      if (file?.name !== initialDocument.data.path.split('/').pop()) {
        payloadEdit = new FormData();
        payloadEdit.append('name', val.documentName);
        payloadEdit.append('description', val.documentDesc);
        payloadEdit.append('media', file);
        payloadEdit.append('type', 'product');
        payloadEdit.append('productName', productName);
      } else {
        payloadEdit = {
          name: val.documentName,
          description: val.documentDesc,
          type: 'product',
        };
      }
      try {
        const { data } = await fetchSubmitDocument(
          payloadEdit,
          'PUT',
          initialDocument.data.id,
        );
        temp[initialDocument.index] = {
          id: data.id,
          path: data.path,
          name: data.name,
          description: data.description,
          size: data.size,
          updatedAt: data.updatedAt,
        };
        setDocument(temp);
        setInitialDocument({});
        setSuccessAlert({
          message: 'Document was successfully edited',
          onClose: () => isOpen(false),
        });
      } catch (error) {
        setFailedAlert({ message: `Failed to Edit Document` });
      }
    } else {
      const payload = new FormData();
      payload.append('name', val.documentName);
      payload.append('description', val.documentDesc);
      payload.append('media', file);
      payload.append('type', 'product');
      payload.append('productName', productName);
      try {
        const { data } = await fetchSubmitDocument(payload, 'POST');
        temp.push({
          id: data.id,
          path: data.path,
          name: data.name,
          description: data.description,
          size: data.size,
          updatedAt: data.updatedAt,
        });
        setDocument(temp);
        setSuccessAlert({
          message: 'Document was successfully uploaded',
          onClose: () => isOpen(false),
        });
      } catch (error) {
        setFailedAlert({ message: `Failed to Upload Document` });
      }
    }
  };

  const clearConfirmation = () => setConfirmation(defaultConfirm);

  const handleUploadFile = (e) => {
    setValue('documentName', e.name.split('.').slice(0, -1).join('.'));
    setFile(e);
  };

  const confirmUpload = (val) =>
    setConfirmation({
      actions: [
        { label: 'No', action: clearConfirmation },
        {
          label: 'Yes',
          action: () => {
            clearConfirmation();
            submitUpload(val);
          },
        },
      ],
      content: `Are you sure want to ${
        isEdit ? `Edit` : 'Upload'
      } this document?`,
    });

  const cleanUp = () => {
    setValue('documentName', '');
    setValue('documentDesc', '');
    setFile(null);
    setInitialDocument({});
  };

  useEffect(() => {
    if (initialDocument.data !== undefined) {
      handleInitialFile();
    }

    return () => {
      cleanUp();
    };
  }, []);

  return {
    allowed,
    control,
    confirmUpload,
    handleSubmit,
    handleUploadFile,
    formState,
    file,
    setFile,
    confirmation,
    clearConfirmation,
  };
};

export default useActions;
