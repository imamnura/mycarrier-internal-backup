import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  updateStatus,
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
    getDetail: _getDetail,
    fetchUpdateStatus: _fetchUpdateStatus,
    setContent,
    setProgress,
  } = props;

  const router = useRouter();
  const { id, productName } = router.query;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
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

  const getDetail = () => _getDetail(id);

  const updateData = (values, file) => {
    const payload = cleanObject({
      status: content?.status,
      bakesNumber: values?.bakesNumber || values?.bakesNumberAuto,
      ...(file
        ? {
            bakesFile: [file],
          }
        : {}),
      noteProgress: values?.noteProgress,
      statusOrderItem: content?.statusOrderItem,
      productId: content?.productId,
    });

    if (_fetchUpdateStatus) _fetchUpdateStatus(payload);
    else fetchUpdateStatus(payload);
  };

  const fetchUpdateStatus = async (payload) => {
    try {
      setLoadingAlert();
      await updateStatus(id, payload, productName?.replace(/ /g, ''));
      setSuccessAlert({
        message: 'Document successfully approved',
        onClose: getDetail,
      });
    } catch (e) {
      setFailedAlert({
        message: `Document failed to be approved. ${e.message}`,
      });
    }
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
    fetchUpdateStatus,
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
