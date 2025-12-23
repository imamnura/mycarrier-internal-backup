import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  getDetail,
  updateStatus,
} from '../../../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { actionContent, messageSuccess } from '../utils';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { id: orderNumber, productName } = router.query;

  const { setLoadingAlert, setSuccessAlert, setFailedAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalUpdateStatus, setModalUpdateStatus] = useState({});
  const [modalBakes, setModalBakes] = useState(null);
  const [progress, setProgress] = useState(0);

  const { custAccntName, status } = data;

  const fetchDetail = async (id) => {
    setLoading(true);
    try {
      const { data } = await getDetail(id);
      setData(data);
    } catch (error) {
      setData({});
    } finally {
      setLoading(false);
    }
  };

  const onCloseSuccess = () => fetchDetail(orderNumber);

  const fetchUpdateStatus = async (values) => {
    const payload = {
      ...values,
      status: modalUpdateStatus?.status || values?.status,
    };

    try {
      setLoadingAlert();
      await updateStatus(orderNumber, payload, productName);
      setSuccessAlert({
        message: modalUpdateStatus?.success || messageSuccess[status],
        onClose: onCloseSuccess,
      });
    } catch (e) {
      setFailedAlert({
        message: e?.message,
      });
    }
  };

  const fetchMsightBakes = async (payload) => {
    try {
      setLoadingAlert();
      await updateStatus(orderNumber, payload);
      setSuccessAlert({
        message: 'Document successfully approved',
        onClose: onCloseSuccess,
      });
    } catch (e) {
      setFailedAlert({
        message: e?.message,
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

  const onClickModalUpdateStatus = (v) => () => setModalUpdateStatus(v);

  const onClickApprove = () =>
    setModalBakes({ custAccntName, status: 'delivery approval' });

  const onSubmitForward = (v) => () => {
    fetchUpdateStatus(v);
    closeConfirmation();
  };

  const onClickForwardOperator = () => {
    const confirmation = {
      message: 'Are you sure want to forward this request to Operator?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'Yes',
          onClick: onSubmitForward({ status: 'operator checking' }),
        },
      ],
    };
    setConfirmation(confirmation);
  };

  const action = () => {
    let actions = [];

    if (
      status === 'am approval' &&
      isHaveAccess(feature, 'update_approvalRequest_am')
    ) {
      actions.push({
        // hideDivider: true,
        children: 'APPROVE',
        onClick: onClickApprove,
      });
    } else if (
      status === 'delivery approval' &&
      isHaveAccess(feature, 'update_forward_to_operator_purchase_order')
    ) {
      actions.push({
        children: 'FORWARD TO OPERATOR',
        onClick: onClickForwardOperator,
      });
    } else if (
      status === 'operator checking' &&
      isHaveAccess(feature, 'update_input_api_key_purchase_order')
    ) {
      actions.push({
        children: 'INPUT API KEY',
        onClick: onClickModalUpdateStatus(actionContent.apiKey),
      });
    } else if (
      status === 'operator approval' &&
      isHaveAccess(feature, 'input_secret_key_purchase_order')
    ) {
      actions.push({
        // hideDivider: true,
        children: 'RETURN',
        onClick: onClickModalUpdateStatus(actionContent.return),
        variant: 'ghost',
        mr: 24,
      });
      actions.push({
        // hideDivider: true,
        children: 'COMPLETE',
        onClick: onClickModalUpdateStatus(actionContent.secretKey),
      });
    }

    return actions;
  };

  return {
    action,
    data,
    feature,
    fetchDetail,
    fetchUpdateStatus,
    fetchMsightBakes,
    loading,
    modalBakes,
    setModalBakes,
    modalUpdateStatus,
    onClickModalUpdateStatus,
    onClickApprove,
    onClickForwardOperator,
    onSubmitForward,
    onCloseSuccess,
    orderNumber,
    progress,
    setProgress,
    setModalUpdateStatus,
  };
};

export default useAction;
