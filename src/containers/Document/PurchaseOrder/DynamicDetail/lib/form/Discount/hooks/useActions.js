import { useEffect, useState } from 'react';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { cleanObject } from '@utils/common';
import { validation } from '../validation';
import { useForm } from 'react-hook-form';
import {
  getOptionBakes,
  uploadFile,
} from '@containers/Document/PurchaseOrder/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';

const useActions = (props) => {
  const { fetchUpdateStatus, content, setContent, setProgress } = props;

  const { setFailedAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [step, setStep] = useState(0);
  const [optionsBakesNumber, setOptionsBakesNumber] = useState([]);

  const { control, handleSubmit, formState, reset, watch } = useForm({
    resolver: validation(
      step,
      optionsBakesNumber.map((i) => i?.bakesNumber),
    ),
    mode: 'onChange',
  });

  const bakesNumberAuto = watch('bakesNumberAuto');
  useEffect(() => {
    if (content?.open) {
      if (content?.bakesNumber) {
        setStep(1);
      } else {
        fetchOptionBakes();
      }
      if (content?.currentStatus !== 'am approval') {
        reset({
          discount: content?.discount,
          radioApproval: content?.discount ? '1' : '2',
        });
      }
    }
    return () => {
      setStep(0);
      setOptionsBakesNumber([]);
    };
  }, [content]);

  const fetchOptionBakes = async () => {
    const params = {
      custAccntNum: content?.custAccntNum,
      search: bakesNumberAuto || ' ',
    };

    try {
      const { data } = await getOptionBakes(params);
      setOptionsBakesNumber(data);
    } catch (e) {
      setOptionsBakesNumber([]);
    }
  };

  const uploadDocument = async (values) => {
    const {
      bakesNumber,
      media,
      noteProgress,
      discount,
      radioApproval,
      bakesNumberAuto,
    } = values;

    let formData = new FormData();
    formData.append('file', media.file);

    setProgress(true);

    try {
      const { data } = await uploadFile(formData, setProgress);
      if (data) {
        await fetchUpdateStatus(
          {
            noteProgress,
            discount,
            withDiscount: radioApproval === '1' ? true : false,
            bakesNumber: bakesNumber || bakesNumberAuto,
            bakesFile: [data],
          },
          content,
        );
        setProgress(null);
      }
    } catch (e) {
      setFailedAlert({ message: 'Document failed to upload' });
      setProgress(null);
    }
  };

  const onSubmit = (values) => () => {
    const {
      bakesNumber,
      bakesNumberAuto,
      media,
      noteProgress,
      discount,
      radioApproval,
    } = values;
    const validBakes = optionsBakesNumber.find(
      (v) => v.bakesNumber === bakesNumberAuto,
    );

    // console.log(media, values, "media file")
    if (!media?.file) {
      const withDiscount = radioApproval === '1';

      fetchUpdateStatus(
        cleanObject({
          noteProgress,
          discount: withDiscount ? discount : undefined,
          withDiscount,
          ...(!content?.bakesNumber
            ? {
                bakesNumber: bakesNumberAuto || bakesNumber,
                bakesFile: [validBakes?.bakesFile],
              }
            : {}),
        }),
        content,
      );
    } else {
      uploadDocument(values);
    }

    closeConfirmation();
  };

  const onClose = () => {
    setContent({ ...content, open: false });
    closeConfirmation();
  };

  const handleUpdateStatus = (values) => {
    const confirmation = {
      message: 'Are you sure want to approve this document?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        { children: 'Yes', onClick: onSubmit(values) },
      ],
    };

    setConfirmation(confirmation);
    setContent({ ...content, open: false });
  };

  return {
    control,
    formState,
    handleSubmit,
    handleUpdateStatus,
    onClose,
    step,
    setStep,
    watch,
    optionsBakesNumber,
  };
};

export default useActions;
