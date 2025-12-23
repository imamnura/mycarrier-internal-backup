import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDetailUMB, updateStatus } from '../../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { cleanObject, isHaveAccess } from '@utils/common';
import { route } from '@configs';
import * as yup from 'yup';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { LOCATOR } from '../test-locator';

const useAction = (props) => {
  const { feature } = props;

  const testLocator = LOCATOR;

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const {
    setConfirmation: _setConfirmation,
    closeConfirmation: _closeConfirmation,
  } = usePopupConfirmation();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);

  const onClickModalUpdateStatus = (value) => () => setModalUpdateStatus(value);

  const setConfirmation = (val) => () => _setConfirmation(val);
  const closeConfirmation = () => () => _closeConfirmation();

  const onCloseSuccess = () => () => fetchDetail(orderNumber);

  const { id: orderNumber } = router.query;

  const fetchDetail = async (id) => {
    const validatePath = router.asPath === route.umb('detail', id);

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetailUMB(id);
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

  const fetchUpdateStatus = async (value, content) => {
    const payload = {
      rejectReason: value?.rejectReason,
      activationStatus: modalUpdateStatus?.status || content?.status,
    };

    try {
      setLoadingAlert();
      await updateStatus(orderNumber, cleanObject(payload));
      setSuccessAlert({
        message: modalUpdateStatus?.success || content?.success,
        onClose: onCloseSuccess(),
      });
    } catch (e) {
      setFailedAlert({
        message: 'Failed to Update Data',
      });
    }
  };

  useEffect(() => {
    if (orderNumber) {
      if (isHaveAccess(feature, 'read_detail')) {
        fetchDetail(orderNumber);
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
      }
    }
  }, [orderNumber]);

  const actionContent = {
    reject: {
      caption:
        'Once you reject, it will be processed and data will be sent to the customer automatically',
      confirmation: 'Are you sure want to reject this request?',
      success: 'Data has been sent to the provider',
      title: 'Please give the reason of reject',
      schema: [
        {
          name: 'rejectReason',
          placeholder: 'Please describe the reason..',
          label: 'Reason',
          maxLength: 500,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        rejectReason: yup.string().required().label('Reason'),
      },
    },
  };

  const onClickConfirm = (content) => () => {
    _closeConfirmation();
    fetchUpdateStatus(null, content);
  };

  const action = () => {
    let actions = [];

    if (['checking'].includes(data?.activationStatus)) {
      if (isHaveAccess(feature, 'update_customerRequest')) {
        actions.push({
          id: testLocator.reject,
          children: 'reject',
          variant: 'ghost',
          onClick: onClickModalUpdateStatus({
            ...actionContent.reject,
            status: 'rejected',
            open: true,
          }),
        });
        actions.push({
          id: testLocator.approve,
          children: 'approve',
          hideDivider: true,
          ml: 24,
          onClick: setConfirmation({
            message: 'Are you sure want to approve this request?',
            action: [
              {
                id: testLocator.confirmationNo,
                children: 'no',
                variant: 'ghost',
                onClick: closeConfirmation(),
              },
              {
                id: testLocator.confirmationYes,
                children: 'yes',
                onClick: onClickConfirm({
                  status: 'checking order',
                  success: 'Data has been sent to the provider',
                }),
              },
            ],
          }),
        });
      }
    }

    if (['onprogress'].includes(data?.activationStatus)) {
      if (isHaveAccess(feature, 'update_checkingTelkom')) {
        actions.push({
          id: testLocator.confirm,
          children: 'confirm',
          onClick: setConfirmation({
            message: 'Are you sure want to complete this request?',
            action: [
              {
                id: testLocator.confirmationConfirmNo,
                children: 'no',
                variant: 'ghost',
                onClick: closeConfirmation(),
              },
              {
                id: testLocator.confirmationConfirmYes,
                children: 'yes',
                onClick: onClickConfirm({
                  status: 'completed',
                  success: 'UMB activation request succesfully completed',
                }),
              },
            ],
          }),
        });
      }
    }

    return actions;
  };

  return {
    action,
    orderNumber,
    data,
    loading,
    fetchDetail,
    modalUpdateStatus,
    setModalUpdateStatus,
    fetchUpdateStatus,
  };
};

export default useAction;
