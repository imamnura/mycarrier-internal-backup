import { route } from '@configs';
import {
  getDetailDraftBillingReminder,
  postDraftBillingReminder,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useAction = () => {
  const router = useRouter();
  const {
    query: { bpNumber, count, id: reminderId },
  } = router;

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();

  const [tab, setTab] = useState(1);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDetailDraft = async () => {
    setLoading(true);
    try {
      const result = await getDetailDraftBillingReminder(reminderId);
      setData(result.data);
      if (result.data.step) {
        const step = result.data.step === 3 ? 3 : result.data.step + 1;
        setTab(step);
      } else {
        setTab(1);
      }
      setLoading(false);
    } catch (error) {
      setData(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reminderId) {
      fetchDetailDraft();
    } else {
      setLoading(false);
    }
  }, [bpNumber, reminderId, count]);

  const redirect = () => router.push(route.billsAndPayment('detail', bpNumber));

  const fetchDiscard = async () => {
    if (!reminderId) {
      closeConfirmation();
      setSuccessAlert({
        message: 'Billing reminder successfully discarded',
        onClose: redirect,
      });
      return;
    }

    const data = {
      status: 'discard',
      bpNumber,
      reminderId,
    };
    setLoadingAlert();
    closeConfirmation();
    try {
      await postDraftBillingReminder(reminderId, data);
      await setSuccessAlert({
        message: 'Billing reminder successfully discarded',
        onClose: redirect,
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
        { children: 'yes', onClick: fetchDiscard },
      ],
    });
  };

  return {
    data,
    setData,
    loading,
    tab,
    setTab,
    onDiscard,
    redirect,
    fetchDiscard,
  };
};

export default useAction;
