import * as yup from 'yup';
import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetail,
  updateStatus,
} from '../../../../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import useQueryParams from '@utils/hooks/useQueryParams';

const useAction = (props) => {
  const { feature } = props;

  const { queryParams } = useQueryParams();
  const { id: orderNumber, productFlow } = queryParams;

  const { setLoadingAlert, setSuccessAlert, setFailedAlert } = usePopupAlert();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);
  const [modalBakes, setModalBakes] = useState(null);
  const [progress, setProgress] = useState(0);

  const fetchDetail = async (id) => {
    setLoading(true);
    try {
      const { data } = await getDetail(id);
      setData(data);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const onCloseSuccess = () => fetchDetail(orderNumber);

  const fetchUpdateStatus = async (values, content = {}) => {
    const { success, status } = content;
    const payload = {
      ...values,
      status,
      productFlow,
      productId: data?.productId,
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
        message: `Failed to Update Data. ${e?.message}`,
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

  const formContent = {
    schema: [
      {
        name: 'noteProgress',
        placeholder: 'Please describe the note..',
        label: 'Note',
        maxLength: 1000,
        minRows: 3,
        multiline: true,
        required: true,
      },
    ],
    validation: {
      noteProgress: yup.string().required().label('Note'),
    },
  };

  const actionContent = {
    return: {
      ...formContent,
      open: true,
      caption:
        'Once you returned this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to return this document?',
      status: 'customer returned',
      success: 'Document successfully returned',
      title: 'Please give note of return',
    },
    reject: {
      ...formContent,
      open: true,
      caption:
        'Once you rejected this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to reject this document?',
      status: 'rejected',
      success: 'Document successfully rejected',
      title: 'Please give note of reject',
    },
    approve: {
      ...formContent,
      open: true,
      caption:
        'Once you approved this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to approve this document?',
      status: 'approved',
      success: 'Document successfully approved',
      title: 'Please give note of approve',
    },
  };

  const onClickApprove = () => {
    if (!data?.bakesNumber)
      setModalBakes({
        custAccntName: data?.custAccntName,
        status: 'approved',
        success: 'Document successfully approved',
      });
    else setModalUpdateStatus(actionContent.approve);
  };

  const action = () => {
    let actions = [];

    if (
      data?.status === 'am approval' &&
      isHaveAccess(feature, 'update_approvalRequest_am')
    ) {
      actions.push({
        hideDivider: true,
        children: 'REJECT',
        variant: 'ghost',
        onClick: onClickModalUpdateStatus(actionContent.reject),
        mr: 24,
      });
      if (data?.orderInformation?.orderType !== 'Change Ownership') {
        actions.push({
          hideDivider: true,
          children: 'RETURN',
          onClick: onClickModalUpdateStatus(actionContent.return),
          variant: 'ghost',
          mr: 24,
        });
      }
      actions.push({
        hideDivider: true,
        children: 'APPROVE',
        onClick: onClickApprove,
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
    onCloseSuccess,
    orderNumber,
    progress,
    setProgress,
    setModalUpdateStatus,
  };
};

export default useAction;
