import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetail,
  updateStatus,
} from '../../../../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import * as yup from 'yup';
import { cleanObject, titleCapitalize } from '@utils/common';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { route } from '@configs';
import useQueryParams from '@utils/hooks/useQueryParams';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { queryParams } = useQueryParams();
  const { id: orderNumber, productName, productFlow, orderType } = queryParams;

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);
  const [modalUploadBaso, setModalUploadBaso] = useState(null);
  const [progress, setProgress] = useState(null);

  const fetchUpdateStatus = async (
    value,
    { success, status, statusOrderItem },
  ) => {
    const payload = cleanObject({
      ...value,
      status,
      statusOrderItem,
      productFlow,
      productId: data?.productId,
    });

    try {
      setLoadingAlert();
      await updateStatus(orderNumber, payload);
      setSuccessAlert({
        message: success,
        onClose: onCloseSuccess(),
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
        bakesDuration: res?.bakesDuration && `${res?.bakesDuration} Months`,
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

  const onClickModalUpdateStatus = (value) => () => setModalUpdateStatus(value);

  const onClickModalUploadBaso = (value) => () => setModalUploadBaso(value);

  const handleConfirmation = (confirmation) => () =>
    setConfirmation(confirmation);

  const onCloseSuccess = () => () => fetchDetail(orderNumber);

  const onClickOrderItem = () => () =>
    router.push({
      pathname: route.purchaseOrder(
        'orderItem',
        data?.orderNumber,
        'solutions',
      ),
      query: {
        orderType,
        productFlow,
        productName,
        isSubmitted: data?.isSubmitted,
      },
    });

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
    return: {
      open: true,
      caption:
        'Once you returned this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to return this document?',
      success: 'Document successfully returned',
      title: 'Please give note of return',
      schema: [
        {
          name: 'noteProgress',
          placeholder: 'Please describe the reason..',
          label: 'Note',
          maxLength: 160,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        noteProgress: yup.string().required().label('Note'),
      },
    },
    approve: {
      open: true,
      caption:
        'Once you approved this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to approve this document?',
      success: 'Document successfully approved',
      title: 'Please give note of approve',
      schema: [
        {
          name: 'noteProgress',
          placeholder: 'Please describe the note..',
          label: 'Note',
          maxLength: 160,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        noteProgress: yup.string().required().label('Note'),
      },
    },
  };

  const action = () => {
    let actions = [];

    const segmentReturned =
      data?.worklog[data?.worklog?.length - 1].status === 'segment returned';

    if (
      data?.status === 'draft' &&
      isHaveAccess(feature, 'update_approvalRequest_am')
    ) {
      if (segmentReturned) {
        actions.push({
          variant: 'ghost',
          children: 'Return',
          onClick: onClickModalUpdateStatus({
            ...actionContent.return,
            status: 'am returned',
          }),
        });
        actions.push({
          hideDivider: true,
          ml: 24,
          children: 'Edit Order Item',
          onClick: onClickOrderItem(),
        });
      } else {
        if (data?.packages?.length) {
          actions.push({
            children: 'Edit Order Item',
            variant: 'ghost',
            onClick: onClickOrderItem(),
          });
        }
        actions.push({
          children: 'Return',
          variant: 'ghost',
          onClick: onClickModalUpdateStatus({
            ...actionContent.return,
            status: 'am returned',
          }),
        });
        if (data?.packages?.length) {
          actions.push({
            hideDivider: true,
            ml: 24,
            children: 'Approve',
            onClick: onClickModalUpdateStatus({
              ...actionContent.approve,
              status: 'segment approval',
            }),
          });
        } else {
          actions.push({
            hideDivider: true,
            ml: 24,
            children: 'Add Order Item',
            onClick: onClickOrderItem(),
          });
        }
      }
    }
    if (
      data?.status === 'am approval' &&
      isHaveAccess(feature, 'update_approvalRequest_am')
    ) {
      if (data?.packages?.length) {
        actions.push({
          children: 'Edit Order Item',
          variant: 'ghost',
          onClick: onClickOrderItem(),
        });
      }
      if (data?.orderInformation?.orderType !== 'Change Ownership') {
        actions.push({
          children: 'Return',
          variant: 'ghost',
          onClick: onClickModalUpdateStatus({
            ...actionContent.return,
            status: 'am returned',
          }),
        });
      }
      if (data?.packages?.length) {
        actions.push({
          hideDivider: true,
          ml: 24,
          children: 'Approve',
          onClick: onClickModalUpdateStatus({
            ...actionContent.approve,
            status: 'segment approval',
          }),
        });
      } else {
        actions.push({
          hideDivider: true,
          ml: 24,
          children: 'Add Order Item',
          onClick: onClickOrderItem(),
        });
      }
    }
    if (
      data?.status === 'segment approval' &&
      isHaveAccess(feature, 'update_approvalRequest_segment')
    ) {
      actions.push({
        variant: 'ghost',
        children: 'Return',
        onClick: onClickModalUpdateStatus({
          ...actionContent.return,
          status: 'segment returned',
        }),
      });
      actions.push({
        hideDivider: true,
        ml: 24,
        children: 'Approve',
        onClick: handleConfirmation({
          message: 'Are you sure want to approve this document?',
          action: [
            { children: 'No', variant: 'ghost', onClick: closeConfirmation },
            {
              children: 'Yes',
              onClick: onClickUpdateStatus(null, {
                status: 'delivery approval',
                success: 'Document successfully approved',
              }),
            },
          ],
        }),
      });
    }
    if (
      data?.status === 'segment returned' &&
      isHaveAccess(feature, 'update_approvalRequest_am')
    ) {
      actions.push({
        variant: 'ghost',
        children: 'Return',
        onClick: onClickModalUpdateStatus({
          ...actionContent.return,
          status: 'am returned',
        }),
      });
      actions.push({
        hideDivider: true,
        ml: 24,
        children: 'Edit Order Item',
        onClick: onClickOrderItem(),
      });
    }
    if (
      data?.status === 'delivery approval' &&
      isHaveAccess(feature, 'update_approvalRequest_dd')
    ) {
      actions.push({
        hideDivider: true,
        ml: 24,
        children: 'Dispatch Order',
        onClick: handleConfirmation({
          message: 'Are you sure want to approve this document?',
          action: [
            { children: 'No', variant: 'ghost', onClick: closeConfirmation },
            {
              children: 'Yes',
              onClick: onClickUpdateStatus(null, {
                status: 'provisioning',
                success: 'Document successfully approved',
              }),
            },
          ],
        }),
      });
    }
    if (
      data?.status === 'baso signed' &&
      isHaveAccess(feature, 'update_upload_baso_fabd_purchase_order')
    ) {
      !data?.activationDoc?.length &&
        actions.push({
          children: 'upload baso',
          onClick: onClickModalUploadBaso({
            status: 'baso signed',
            success: 'Document successfully uploaded',
            textInfo: 'Please upload BASO document below',
            confirmation: 'Are you sure want to upload this document?',
            title: 'Upload BASO',
            grandTotal: data?.grandTotal,
            isEligibleForBasoDigitalSign: data?.isEligibleForBasoDigitalSign,
            open: true,
            orderType: data?.orderInformation?.orderType,
          }),
        });
    }
    return actions;
  };

  return {
    action,
    orderNumber,
    productName,
    data,
    loading,
    modalUpdateStatus,
    setModalUpdateStatus,
    fetchUpdateStatus,
    modalUploadBaso,
    setModalUploadBaso,
    progress,
    setProgress,
  };
};

export default useAction;
