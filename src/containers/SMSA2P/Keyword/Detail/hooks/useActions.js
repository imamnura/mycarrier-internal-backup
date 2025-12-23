import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  getDetailKeyword,
  updateStatusKeyword,
} from '../../_repositories/repositories';
import { cleanObject, isHaveAccess } from '@utils/common';
import { route } from '@configs';

const useAction = (props) => {
  const { feature } = props;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const onClickModalUpdateStatus = (value) => () => setModalUpdateStatus(value);
  const onCloseSuccess = () => fetchDetail();

  const { id: orderNumber } = router.query;

  const fetchDetail = async () => {
    const validatePath = router.asPath === route.keyword('detail', orderNumber);

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetailKeyword(orderNumber);
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

  const fetchUpdateStatus = async (value, messageSuccess) => {
    const payload = {
      activationStatus: modalUpdateStatus?.status,
      ...value,
    };

    try {
      setLoadingAlert();
      await updateStatusKeyword(orderNumber, cleanObject(payload));
      setSuccessAlert({
        message: modalUpdateStatus?.success || messageSuccess,
        onClose: onCloseSuccess,
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

  const actionContent = {
    rejected: {
      caption:
        'Once you reject this, it will be processed and data will be sent to the customer automatically',
      confirmation: 'Are you sure want to reject this document?',
      success: 'Document successfully rejected',
      title: 'Please give note of reject',
      schema: [
        {
          name: 'rejectReason',
          placeholder: 'Please describe the reason...',
          label: 'Reason',
          maxLength: 3000,
          minRows: 3,
          multiline: true,
        },
      ],
    },
  };

  const onClickUpdateOrder = (status) => () => {
    const messageSuccess = 'Keyword activation request succesfully completed';
    const confirmation = {
      message: 'Are you sure want to confirm this request?',
      action: [
        { children: 'No', onClick: () => closeConfirmation() },
        {
          children: 'Yes',
          onClick: () => {
            fetchUpdateStatus({ activationStatus: status }, messageSuccess);
            closeConfirmation();
          },
        },
      ],
    };
    setConfirmation(confirmation);
  };

  const action = () => {
    let actions = [];

    if (['checking'].includes(data?.activationStatus)) {
      if (isHaveAccess(feature, 'update_customerRequest')) {
        actions.push({
          children: 'Reject',
          variant: 'ghost',
          onClick: onClickModalUpdateStatus({
            ...actionContent.rejected,
            status: 'rejected',
            open: true,
          }),
        });
      }
      {
        actions.push({
          children: 'Confirm',
          onClick: onClickUpdateOrder('checking order'),
        });
      }
    }
    if (['onprogress'].includes(data?.activationStatus)) {
      if (isHaveAccess(feature, 'update_checkingTelkom')) {
        actions.push({
          children: 'Complete',
          onClick: onClickUpdateOrder('completed'),
        });
      }
    }

    return actions;
  };

  //   const onClickResend = () => fetchResendNotification(orderNumber);

  useEffect(() => {
    fetchDetail();
  }, [orderNumber]);

  return {
    action,
    data,
    fetchDetail,
    fetchUpdateStatus,
    modalUpdateStatus,
    setModalUpdateStatus,
    onClickModalUpdateStatus,
    loading,
    orderNumber,
    onConfirm,
  };
};

export default useAction;
