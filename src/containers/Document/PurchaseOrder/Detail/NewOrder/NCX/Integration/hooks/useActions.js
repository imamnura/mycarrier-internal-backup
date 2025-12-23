import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { route } from '@configs';
import {
  getDetail,
  updateStatus,
} from '../../../../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import { cleanObject, titleCapitalize } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import useQueryParams from '@utils/hooks/useQueryParams';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { queryParams } = useQueryParams();
  const { id: orderNumber, productName, orderType, productFlow } = queryParams;

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);
  const [detailNeucentrix, setNeucentrix] = useState(null);
  const [progress, setProgress] = useState(null);

  const onCloseSuccess = () => fetchDetail(orderNumber);

  const fetchUpdateStatus = async (value, { success, status }) => {
    const payload = cleanObject({
      ...value,
      status: status,
      productFlow,
      productId: data?.productId,
    });

    try {
      setLoadingAlert();
      await updateStatus(orderNumber, payload);
      setSuccessAlert({
        message: success,
        onClose: onCloseSuccess,
      });
    } catch (e) {
      setFailedAlert({
        message: 'Failed to Update Data',
      });
    }
  };

  const fetchDetail = async (id) => {
    setLoading(true);
    try {
      const { data: res } = await getDetail(id);
      const normalizeData = {
        ...res,
        orderType: titleCapitalize(res?.orderType),
      };
      setData(normalizeData);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const onClickUpdateStatus = (data, content) => () => {
    fetchUpdateStatus(data, content);
    closeConfirmation();
  };

  const onClickNeucentrix =
    ({ isSubmitted }) =>
      () =>
        router.push({
          pathname: route.purchaseOrder(
            'orderItem',
            data?.orderNumber,
            'neucentrix',
          ),
          query: {
            orderType: orderType,
            productFlow: productFlow,
            productName: productName.toLowerCase(),
            isSubmitted: isSubmitted,
          },
        });

  const handleConfirmation = (confirmation) => () =>
    setConfirmation(confirmation);

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
      status:
        data?.status === 'segment approval'
          ? 'segment returned'
          : 'am returned',
      success: 'Document successfully returned',
      title: 'Please give note of return',
    },
    approve: {
      ...formContent,
      open: true,
      caption:
        'Once you approved this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to approve this document?',
      status:
        data?.status === 'segment approval'
          ? 'delay order'
          : 'segment approval',
      success: 'Document successfully approved',
      title: 'Please give note of approve',
    },
  };

  const onUpdateStatus = (type) => () =>
    setModalUpdateStatus(actionContent[type]);

  const action = () => {
    let actions = [];
    const divider = {
      hideDivider: true,
      ml: 24,
    };

    if (isHaveAccess(feature, 'update_approvalRequest_am')) {
      if (data?.status === 'am approval') {
        if (data?.label === 'completed') {
          actions.push(
            {
              children: 'Edit Order Item',
              onClick: onClickNeucentrix({ isSubmitted: true }),
              variant: 'ghost',
              ...divider,
            },
            {
              children: 'Return',
              onClick: onUpdateStatus('return'),
              variant: 'ghost',
            },
            {
              children: 'Approve',
              onClick: onUpdateStatus('approve'),
              ...divider,
            },
          );
        } else {
          actions.push(
            {
              children: 'Return',
              onClick: onUpdateStatus('return'),
              variant: 'ghost',
              ...divider,
            },
            {
              children:
                data?.label === 'draft' ? 'Edit Order Item' : 'Add Order Item',
              onClick: onClickNeucentrix({ isSubmitted: false }),
              ...divider,
            },
          );
        }
      }
      if (data?.status === 'segment returned') {
        actions.push(
          {
            children: 'Return',
            onClick: onUpdateStatus('return'),
            variant: 'ghost',
            ...divider,
          },
          {
            children: 'Edit Order Item',
            onClick: onClickNeucentrix({ isSubmitted: true }),
            ...divider,
          },
        );
      }
    }
    if (
      data?.status === 'segment approval' &&
      isHaveAccess(feature, 'update_approvalRequest_segment')
    ) {
      actions.push(
        {
          children: 'Return',
          onClick: onUpdateStatus('return'),
          variant: 'ghost',
          ...divider,
        },
        { children: 'Approve', onClick: onUpdateStatus('approve'), ...divider },
      );
    }

    return actions;
  };

  return {
    action,
    data,
    detailNeucentrix,
    setNeucentrix,
    modalUpdateStatus,
    setModalUpdateStatus,
    fetchDetail,
    fetchUpdateStatus,
    handleConfirmation,
    loading,
    onCloseSuccess,
    orderNumber,
    onClickUpdateStatus,
    onClickNeucentrix,
    onUpdateStatus,
    productName,
    progress,
    setProgress,
  };
};

export default useAction;
