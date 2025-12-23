import { useEffect, useState } from 'react';
import {
  uploadFile,
  getOptionBakes,
} from '../../../../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import validation from '../validation';
import { useForm } from 'react-hook-form';
import { cleanObject } from '@utils/common';

const useActions = (props) => {
  const {
    content,
    fetchUpdateStatus,
    setContent,
    setProgress,
  } = props;

  const { setFailedAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [step, setStep] = useState(0);
  const [optionsBakesNumber, setOptionsBakesNumber] = useState([]);
  const [loadingOptionBakes, setLoadingOptionBakes] = useState(true);

  const { control, handleSubmit, formState, reset, watch } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const bakesNumberAuto = watch('bakesNumberAuto');

  const fetchOptionBakes = async (custAccntName, search) => {
    try {
      setLoadingOptionBakes(true);
      const { data } = await getOptionBakes({ custAccntName, search });
      setOptionsBakesNumber(data);
    } catch (e) {
      setOptionsBakesNumber([]);
    } finally {
      setLoadingOptionBakes(false);
    }
  };

  const updateData = (values, file) => {
    const payload = cleanObject({
      bakesNumber: values?.bakesNumber || values?.bakesNumberAuto,
      ...(file
        ? {
            bakesFile: [file],
          }
        : {}),
      noteProgress: values?.noteProgress,
      statusOrderItem: content?.statusOrderItem,
    });

    const property = {
      success: content?.success,
      status: content?.status
    }
    fetchUpdateStatus(payload, property);
  };

  const uploadDocument = async (media, callback) => {
    let formData = new FormData();
    formData.append('file', media.file);

    closeConfirmation();

    try {
      const { data } = await uploadFile(formData, setProgress);
      callback(data);
      setProgress(null);
    } catch (e) {
      setFailedAlert({
        message: `Document failed to be uploaded. ${e?.message}`,
      });
      setProgress(null);
    }
  };

  const handleUpdateStatus = (values) => {
    const { bakesNumberAuto, media } = values;
    const validBakes = optionsBakesNumber.find(
      (v) => v.bakesNumber === bakesNumberAuto,
    );

    const confirmation = {
      message: 'Are you sure want to approve this document?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'Yes',
          onClick: () => {
            if (!values?.media?.file) {
              updateData(values, validBakes?.bakesFile);
            } else {
              uploadDocument(media, (file) => updateData(values, file));
            }
            closeConfirmation();
          },
        },
      ],
    };

    setConfirmation(confirmation);
    setContent(null);
  };

  const onClose = () => {
    setContent(null);
    closeConfirmation();
  };

  useEffect(() => {
    if (content) {
      fetchOptionBakes(content?.custAccntName, bakesNumberAuto || ' ');
    }
    return () => {
      reset();
      setOptionsBakesNumber([]);
    };
  }, [content]);

  return {
    control,
    formState,
    handleSubmit,
    loadingOptionBakes,
    handleUpdateStatus,
    onClose,
    step,
    setStep,
    watch,
    optionsBakesNumber,
  };
};

export default useActions;
