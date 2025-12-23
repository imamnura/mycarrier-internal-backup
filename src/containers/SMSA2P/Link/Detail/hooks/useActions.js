import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDetailLink, updateStatus } from '../../_repositories/repositories';
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
    const validatePath = router.asPath === route.link('detail', id);

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetailLink(id);
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
      ...value,
      activationStatus: content?.status || modalUpdateStatus?.status,
    };

    try {
      setLoadingAlert();
      await updateStatus(orderNumber, cleanObject(payload));
      setSuccessAlert({
        message: content?.success || modalUpdateStatus?.success,
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
      success: 'Link activation request successfully rejected',
      title: 'Please give the reason of reject',
      schema: [
        {
          name: 'rejectReason',
          placeholder: 'Please describe the reason..',
          label: 'Reason',
          maxLength: 3000,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        rejectReason: yup.string().required().label('Reason'),
      },
    },
    sendParameter: {
      textInfo:
        'Data will be sent according the active date that has been requested by customer',
      confirmation: 'Are you sure want to confirm this request?',
      success: 'Link activation request successfully confirmed',
      title: 'Please filled the data to be sent to customer',
      schema: [
        {
          name: 'ip',
          label: 'IP Customer',
          required: true,
          disabled: true,
        },
        {
          name: 'port',
          label: 'Port',
          required: true,
        },
        {
          name: 'username',
          label: 'Username',
          required: true,
        },
        {
          name: 'password',
          label: 'Password',
          required: true,
          type: 'password',
        },
      ],
      validation: {
        ip: yup.string().required().label('IP Customer'),
        port: yup.string().required().label('Port'),
        username: yup.string().required().label('Username'),
        password: yup.string().required().label('Password'),
      },
      autofill: {
        ip: data?.ip,
      },
    },
  };

  const onClickConfirm = (content) => () => {
    _closeConfirmation();
    fetchUpdateStatus(null, content);
  };

  const action = () => {
    let actions = [];

    if (['customerrequest'].includes(data?.activationStatus)) {
      if (isHaveAccess(feature, 'update_approveAM')) {
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
                  status: 'approval_provider',
                  success: 'Link activation request successfully approved',
                }),
              },
            ],
          }),
        });
      }
    }

    if (['approval_provider'].includes(data?.activationStatus)) {
      if (isHaveAccess(feature, 'update_sendParameter')) {
        actions.push({
          children: 'confirm',
          onClick: onClickModalUpdateStatus({
            ...actionContent.sendParameter,
            status: 'customerreview',
            open: true,
          }),
        });
      }
    }

    if (['customerreview'].includes(data?.activationStatus)) {
      if (isHaveAccess(feature, 'update_complete')) {
        actions.push({
          children: 'complete',
          onClick: setConfirmation({
            message: 'Are you sure want to complete this request?',
            action: [
              {
                children: 'no',
                variant: 'ghost',
                onClick: closeConfirmation(),
              },
              {
                children: 'yes',
                onClick: onClickConfirm({
                  status: 'completed',
                  success: 'Link activation request succesfully completed',
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
