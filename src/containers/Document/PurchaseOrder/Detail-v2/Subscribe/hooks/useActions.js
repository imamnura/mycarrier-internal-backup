import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { getDetail, updateStatus } from '../../../_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import * as yup from 'yup';
import { titleCapitalize } from '@utils/common';

const useAction = (props) => {
  const { feature } = props;

  const router = useRouter();
  const { id: orderNumber } = router.query;

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);
  const [modalUploadBaso, setModalUploadBaso] = useState(null);
  const [modalBakes, setModalBakes] = useState(null);
  const [progress, setProgress] = useState(0);

  const onClickModalUpdateStatus = (value) => () => setModalUpdateStatus(value);
  const onClickModalUploadBakes = (value) => () => setModalBakes(value);
  const onClickModalUploadBaso = (value) => () => setModalUploadBaso(value);

  const onCloseSuccess = () => () => fetchDetail(orderNumber);

  const fetchUpdateStatus = async (value, { success, status }) => {
    const payload = {
      ...value,
      productId: data?.productId,
      status: status,
    };

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
      };
      setData(normalizeData);
    } catch (error) {
      setData(null);
    } finally {
      setLoading(false);
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

  const onClickApprovalAM = () => {
    if (!data?.bakesNumber) {
      return onClickModalUploadBakes({
        custAccntName: data?.custAccntName,
        status: 'delivery approval',
        productId: data?.productId,
      });
    } else {
      return onClickModalUpdateStatus({
        ...actionContent.approve,
        status: 'delivery approval',
        open: true,
      });
    }
  };

  const action = () => {
    let actions = [];

    if (['am approval'].includes(data?.status)) {
      if (isHaveAccess(feature, 'update_approvalRequest_am')) {
        actions.push({
          // hideDivider: true,
          children: 'Return',
          variant: 'ghost',
          onClick: onClickModalUpdateStatus({
            ...actionContent.return,
            status: 'am returned',
            open: true,
          }),
        });
        actions.push({
          // hideDivider: true,
          ml: 24,
          children: 'Approve',
          onClick: onClickApprovalAM(),
        });
      }
    }
    if (['delivery approval'].includes(data?.status)) {
      if (isHaveAccess(feature, 'update_approvalRequest_dd')) {
        actions.push({
          // hideDivider: true,
          children: 'Dispatch Order',
          onClick: onClickModalUpdateStatus({
            ...actionContent.approve,
            status: 'provisioning',
            open: true,
          }),
        });
      }
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
    data,
    loading,
    modalUpdateStatus,
    setModalUpdateStatus,
    modalUploadBaso,
    setModalUploadBaso,
    fetchUpdateStatus,
    onClickModalUpdateStatus,
    onCloseSuccess,
    modalBakes,
    setModalBakes,
    progress,
    setProgress,
  };
};

export default useAction;
