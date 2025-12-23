import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  getDetailLBA,
  resendEmailNotif,
  updateStatusLBA,
} from '../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { route } from '@configs';

const useAction = (props) => {
  const { feature } = props;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [countDown, setCountDown] = useState(0);
  const [loading, setLoading] = useState(true);

  const { id: orderNumber } = router.query;
  const hasAccessResend = isHaveAccess(feature, 'resend_notification_email');
  const emailNotif = data?.notification?.email || {};
  const emailStatus =
    {
      true: 'Sent',
      false: 'Failed',
    }[emailNotif?.isSent] || '';

  const fetchDetail = async () => {
    const validatePath = router.asPath === route.lba('detail', orderNumber);

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetailLBA(orderNumber);
        setData(data);
      } catch (error) {
        if (
          ['You are not allowed to access this menu!'].includes(error.message)
        ) {
          setFailedAlert({
            message: error.message,
          });
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchResendNotification = async (id) => {
    setLoadingAlert();
    try {
      await resendEmailNotif(id);
      setSuccessAlert({
        message: 'The notification is successfully resent',
        onClose: fetchDetail,
      });
    } catch (e) {
      setFailedAlert({
        message: e.message,
      });
    }
  };

  const fetchUpdateStatus = async (params) => {
    const { successMessage, updateTo } = params;

    const data = {
      activationStatus: updateTo,
    };

    closeConfirmation();
    setLoadingAlert();

    try {
      await updateStatusLBA(orderNumber, data);
      setSuccessAlert({
        message: successMessage,
        onClose: fetchDetail,
      });
    } catch (e) {
      setFailedAlert({
        message: e.message,
      });
    }
  };

  const onConfirm = (params) => {
    const { confirmMessage } = params;

    const confirmation = {
      message: confirmMessage,
      action: [
        {
          children: 'No',
          onClick: closeConfirmation,
          variant: 'ghost',
        },
        {
          children: 'Yes',
          onClick: () => {
            fetchUpdateStatus(params);
            closeConfirmation();
          },
        },
      ],
    };

    setConfirmation(confirmation);

    return confirmation;
  };

  const action = () => {
    let actions = [];

    if (
      data?.activationStatus === 'checking' &&
      isHaveAccess(feature, 'update_customerRequest')
    ) {
      actions.push({
        children: 'Confirm',
        onClick: () =>
          onConfirm({
            updateTo: 'checking order',
            successMessage: 'Data successfully sent to the provider',
            confirmMessage: 'Are you sure want to confirm this request?',
          }),
      });
    } else if (
      data?.activationStatus === 'onprogress' &&
      isHaveAccess(feature, 'update_checkingTelkom')
    ) {
      actions.push({
        children: 'Complete',
        onClick: () =>
          onConfirm({
            updateTo: 'customer review',
            successMessage: 'LBA activation request succesfully completed',
            confirmMessage: 'Are you sure want to complete this request?',
          }),
      });
    }

    return actions;
  };

  const formatTime = (time) => {
    return String(time).padStart(2, '0');
  };

  const onClickResend = () => fetchResendNotification(orderNumber);

  useEffect(() => {
    fetchDetail();
  }, [orderNumber]);

  useEffect(() => {
    if (emailStatus === 'Failed' && !!emailNotif?.retryExpiredAt) {
      const differenceInSecond = Math.floor(
        (new Date(emailNotif?.retryExpiredAt) - new Date()) / 1000,
      );
      if (differenceInSecond > 0) {
        setCountDown(differenceInSecond);
      }
    }
  }, [data]);

  const onChangeInterval = () => {
    setCountDown((prevCount) => prevCount - 1);
  };

  useEffect(() => {
    let intervalId;

    if (countDown > 0) {
      intervalId = setInterval(onChangeInterval, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [countDown]);

  return {
    action,
    countDown,
    data,
    emailStatus,
    hasAccessResend,
    loading,
    onChangeInterval,
    onClickResend,
    orderNumber,
    onConfirm,
    time: {
      minute: formatTime(Math.floor(countDown / 60)),
      second: formatTime(countDown % 60),
    },
  };
};

export default useAction;
