import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetail,
  updateStatus,
} from '../../../../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import * as yup from 'yup';
import { cleanObject, titleCapitalize } from '@utils/common';
import { rupiahFormat } from '@utils/parser';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import useQueryParams from '@utils/hooks/useQueryParams';

const useAction = (props) => {
  const { feature } = props;

  const { queryParams } = useQueryParams();
  const { id: orderNumber, productName, productFlow } = queryParams;
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);
  const [modalUploadBaso, setModalUploadBaso] = useState(null);
  const [modalDiscount, setModalDiscount] = useState(null);
  const [progress, setProgress] = useState(null);

  const fetchUpdateStatus = async (values, { success, status }) => {
    const payload = cleanObject({
      ...values,
      status: status,
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
        dataConsentFile: res?.dataConsentClient?.concat(
          res?.dataConsentReseller,
        ),
        discount: res?.discount && `${res?.discount}%`,
        packages:
          res?.packages?.length > 0
            ? {
                ...res?.packages[0],
                quantity:
                  res?.packages[0]?.quantity &&
                  `${res?.packages[0]?.quantity} quantity`,
                price:
                  res?.packages[0]?.paymentType &&
                  `${rupiahFormat(res?.packages[0]?.price)}/${res?.packages[0]?.paymentType}`,
              }
            : {},
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

  const onClickModalDiscount = (value) => () => setModalDiscount(value);

  const handleConfirmation = (confirmation) => () =>
    setConfirmation(confirmation);

  const onCloseSuccess = () => () => fetchDetail(orderNumber);

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

    const returned = data?.status?.includes('returned');
    const lastWorklog = data?.worklog?.[data?.worklog?.length - 1];
    const returnedFromSegment =
      returned && lastWorklog?.status?.includes('delivery returned');

    if (data?.status === 'am approval' || returnedFromSegment) {
      if (isHaveAccess(feature, 'update_approvalRequest_am')) {
        actions.push({
          hideDivider: true,
          children: 'Return',
          variant: 'ghost',
          onClick: onClickModalUpdateStatus({
            ...actionContent.return,
            status: 'am returned',
            open: true,
          }),
        });
        actions.push({
          hideDivider: true,
          ml: 24,
          children: data?.bakesNumber ? 'Approve' : 'Upload Bakes',
          onClick: onClickModalDiscount({
            success: 'Document successfully approved',
            bakesNumber: data?.bakesNumber,
            custAccntName: data?.custAccntName,
            status: 'am approval',
            open: true,
          }),
        });
      }
    }
    if (
      data?.status === 'segment approval' &&
      isHaveAccess(feature, 'update_approvalRequest_segment')
    ) {
      actions.push({
        hideDivider: true,
        children: 'Return',
        variant: 'ghost',
        onClick: onClickModalUpdateStatus({
          ...actionContent.return,
          status: 'segment returned',
          open: true,
        }),
      });
      actions.push({
        hideDivider: true,
        ml: 24,
        children: 'Approve',
        onClick: onClickModalUpdateStatus({
          ...actionContent.approve,
          status: 'delivery approval',
          open: true,
        }),
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
    fetchDetail,
    orderNumber,
    productName,
    data,
    loading,
    modalUpdateStatus,
    setModalUpdateStatus,
    fetchUpdateStatus,
    modalUploadBaso,
    setModalUploadBaso,
    modalDiscount,
    setModalDiscount,
    progress,
    setProgress,
    onClickUpdateStatus,
    onClickModalUpdateStatus,
    onClickModalUploadBaso,
    onClickModalDiscount,
    handleConfirmation,
    onCloseSuccess,
  };
};

export default useAction;
