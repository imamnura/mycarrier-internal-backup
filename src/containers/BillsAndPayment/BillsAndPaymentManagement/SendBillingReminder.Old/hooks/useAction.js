import { route } from '@configs/index';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getTemplateBillingReminder,
  submitBillingReminder,
} from '../../_repositories/repositories';
import { useSnackbar } from 'notistack';

const useAction = () => {
  const router = useRouter();
  const {
    query: { bpNumber, count, reminderId },
  } = router;

  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState();

  const fetchTemplate = async () => {
    setLoading(true);
    const params = {
      bpNumber,
      stage: count,
    };

    if (reminderId) {
      params.reminderId = reminderId;
    }

    try {
      const result = await getTemplateBillingReminder({ params });
      setValue(result.data.template);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setValue('');
    }
  };

  useEffect(() => {
    if (bpNumber) {
      fetchTemplate();
    }
  }, [bpNumber, count, reminderId]);

  // const onUploadAttachment = () => {
  //   fetchDetail({
  //     withLoading: false,
  //     onSuccess: () => {
  //       setSuccessAlert({ message: 'Document successfully uploaded' });
  //     },
  //     onError: (error) => {
  //       setFailedAlert({ message: error.message });
  //     }
  //   });
  // };

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { enqueueSnackbar } = useSnackbar();

  const backToDetail = () => {
    router.push(route.billsAndPayment('detail', bpNumber));
  };

  const successDiscard = async () => {
    if (!reminderId) {
      closeConfirmation();
      setSuccessAlert({
        message: 'Billing reminder successfully discarded',
        onClose: backToDetail,
      });
      return;
    }

    const data = {
      status: 'discard',
      bpNumber: bpNumber,
      reminderId,
    };
    setLoadingAlert();
    closeConfirmation();
    try {
      await submitBillingReminder({ data });
      await setSuccessAlert({
        message: 'Billing reminder successfully discarded',
        onClose: backToDetail,
      });
    } catch (error) {
      setFailedAlert({
        message: error.message,
      });
    }
  };

  const onDiscard = () => {
    setConfirmation({
      message: 'Are you sure want to discard this billing reminder?',
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: successDiscard },
      ],
    });
  };

  const [loadingDraft, setLoadingDraft] = useState(false);

  const successSubmit = (type) => async () => {
    closeConfirmation();
    if (type === 'send') {
      setLoadingAlert();
    } else {
      setLoadingDraft(true);
    }

    const data = {
      template: value,
      status: type,
      bpNumber: bpNumber,
      stage: count,
    };

    if (reminderId) {
      data.reminderId = reminderId;
    }

    try {
      const result = await submitBillingReminder({ data });
      if (type === 'send') {
        await setSuccessAlert({
          message: 'Billing reminder successfully sended',
          onClose: backToDetail,
        });
      } else {
        setLoadingDraft(false);
        enqueueSnackbar(`Document saved as draft.`);
        if (!reminderId) {
          router.push(
            route.billsAndPayment(
              'send-billing-reminder',
              2,
              bpNumber,
              result.data.reminderId,
            ),
          );
        }
      }
    } catch (error) {
      setFailedAlert({
        message: error.message,
      });
      setLoadingDraft(false);
    }
  };

  const onSubmit = () => {
    setConfirmation({
      message: 'Are you sure want to send this billing reminder?',
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: successSubmit('send') },
      ],
    });
  };

  const onDraft = () => {
    successSubmit('draft')();
  };

  return {
    bpNumber,
    count,
    loading,
    loadingDraft,
    onDiscard,
    onDraft,
    onSubmit,
    setValue,
    value,
  };
};

export default useAction;
