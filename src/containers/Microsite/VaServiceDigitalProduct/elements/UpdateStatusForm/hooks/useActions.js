import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import validation from '../validation';
import {
  getListStatusVaService,
  postUpdateStatusVaService,
} from '../../../_repositories/repositories';
import generateToken from '@utils/generateToken';

const useActions = (props) => {
  const { modalUpdateStatus, setModalUpdateStatus, referenceId, fetchDetail } =
    props;

  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [optionStatus, setOptionStatus] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: validation,
    mode: 'onChange',
    defaultValues: {
      evidence: [],
    },
  });

  const {
    fields: evidenceList,
    append: addFile,
    remove: deleteFile,
  } = useFieldArray({
    control,
    name: 'evidence',
  });

  const fetchListStatus = async () => {
    setLoadingStatus(true);

    try {
      const accessTokenGenerate = await generateToken();
      const result = await getListStatusVaService(accessTokenGenerate);
      setOptionStatus(result.data);
    } catch (error) {
      setOptionStatus(null);
    } finally {
      setLoadingStatus(false);
    }
  };

  const fetchUpdateStatus = async (values) => {
    setLoadingAlert();

    try {
      const accessTokenGenerate = await generateToken();
      const resultStatus = await postUpdateStatusVaService(
        {
          ...values,
          referenceId,
        },
        accessTokenGenerate,
      );

      if (resultStatus.data) {
        setSuccessAlert({
          message: 'Ticket successfully updated',
          onClose: () => fetchDetail(referenceId),
        });
        closeConfirmation();
      }
    } catch (error) {
      closeConfirmation();
      setFailedAlert({
        message: error.message,
      });
    }
  };

  useEffect(() => {
    fetchListStatus();

    return () => {
      reset();
    };
  }, [modalUpdateStatus]);

  const handleAddFile = (file) => {
    const nFile = {
      fileName: file.data[0].fileName,
      fileUrl: file.data[0].fileUrl,
    };

    addFile(nFile);
  };

  const handleDeleteFile = (index) => {
    deleteFile(index);
  };

  const handleUpdateStatus = (values) => {
    setConfirmation({
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: () => fetchUpdateStatus(values) },
      ],
      message: `Are you sure want to update status this ticket?`,
    });
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
    handleUpdateStatus,
    onClose,
    optionStatus,
    loadingStatus,
    evidenceList,
    handleAddFile,
    handleDeleteFile,
  };
};

export default useActions;
