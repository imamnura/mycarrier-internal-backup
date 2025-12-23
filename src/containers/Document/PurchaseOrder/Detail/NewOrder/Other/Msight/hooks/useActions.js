import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import {
  getDetail,
  updateStatus,
} from '../../../../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { actionContent } from '../utils';
import useQueryParams from '@utils/hooks/useQueryParams';

const useAction = (props) => {
  const { feature } = props;

  const { queryParams } = useQueryParams();
  const { id: orderNumber, productFlow } = queryParams;

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

  const fetchUpdateStatus = async (values, content = {}) => {
    const { success, status } = content;
    const payload = {
      ...values,
      status: status,
      productFlow,
      productId: data?.productId
    };

    try {
      setLoadingAlert();
      await updateStatus(orderNumber, payload);
      setSuccessAlert({
        message: success,
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
    setModalBakes({ 
      custAccntName, 
      status: 'delivery approval',
      success: 'Document successfully approved',
    });

  const onSubmitForward = (content) => () => {
    fetchUpdateStatus({}, content);
    closeConfirmation();
  };

  const onClickForwardOperator = () => {
    const confirmation = {
      message: 'Are you sure want to forward this request to Operator?',
      action: [
        { children: 'No', variant: 'ghost', onClick: closeConfirmation },
        {
          children: 'Yes',
          onClick: onSubmitForward({ 
            status: 'operator checking', 
            success: 'Request successfully forwarded' 
          }),
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
        hideDivider: true,
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
        hideDivider: true,
        children: 'RETURN',
        onClick: onClickModalUpdateStatus(actionContent.return),
        variant: 'ghost',
        mr: 24,
      });
      actions.push({
        hideDivider: true,
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
