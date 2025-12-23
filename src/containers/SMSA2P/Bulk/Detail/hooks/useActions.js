import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  getDetailBulk,
  putUpdateStatus,
} from '../../_repositories/repositories';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { cleanObject, isHaveAccess } from '@utils/common';
import * as yup from 'yup';
import { route } from '@configs';

const useAction = (props) => {
  const { feature, id } = props;
  const router = useRouter();
  const { id: orderNumber } = router.query;

  const { setSuccessAlert, setFailedAlert, setLoadingAlert } = usePopupAlert();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalUpdateStatus, setModalUpdateStatus] = useState(null);
  const [modalInputParams, setModalInputParams] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const onClickModalUpdateStatus = (value) => () => setModalUpdateStatus(value);
  const onClickInputParams = () => setModalInputParams(!modalInputParams);

  const onCloseSuccess = () => fetchDetail();

  const onCLickDownloadAll = () =>
    window.open(data?.attachmentDoc?.fileUrl, '_blank');

  const onClose = () => {
    setModalInputParams(false);
    setModalUpdate(false);
  };

  const onCloseModalNotes = () => {
    onClose();
    closeConfirmation();
  };

  const fetchUpdateStatus = async (value, messageSuccess) => {
    const payload = {
      activationStatus: modalUpdateStatus?.status,
      ...value,
    };
    try {
      setLoadingAlert();
      await putUpdateStatus(orderNumber, cleanObject(payload));
      setSuccessAlert({
        message: modalUpdateStatus?.success || messageSuccess,
        onClose: onCloseSuccess,
      });
    } catch (e) {
      setFailedAlert({
        message: 'Failed to Update Data',
      });
    }
  };

  const fetchDetail = async () => {
    const validatePath = router.asPath === route.bulk('detail', orderNumber);

    if (validatePath) {
      setLoading(true);
      try {
        const { data } = await getDetailBulk(orderNumber);
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

  useEffect(() => {
    if (orderNumber) {
      if (isHaveAccess(feature, 'read_detail_bulk')) {
        fetchDetail();
      } else {
        setFailedAlert({
          message: "You don't have permission to view this page.",
        });
      }
    }
  }, [orderNumber]);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const onClickUpdate = () => {
    const messageSuccess = 'Bulk activation completed succesfully approved';
    const confirmation = {
      message: 'Are you sure want to approve this request?',
      action: [
        { children: 'No', onClick: () => closeConfirmation() },
        {
          children: 'Yes',
          onClick: () => {
            fetchUpdateStatus(
              { activationStatus: 'completed' },
              messageSuccess,
            );
            closeConfirmation();
          },
        },
      ],
    };

    setConfirmation(confirmation);
  };

  const actionContent = {
    returned: {
      caption:
        'Once you returned this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to return this document?',
      success: 'Document successfully returned',
      title: 'Please give note of return',
      schema: [
        {
          name: 'noteProgress',
          placeholder: 'Please describe the reason...',
          label: 'Note',
          maxLength: 3000,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        noteProgress: yup.string().required().label('Note'),
      },
    },
    returnUpdated: {
      caption:
        'Once you returned this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to update this request?',
      success: 'Bulk activation returned succesfully updated',
      title: 'Please give note of return',
      schema: [
        {
          name: 'noteProgress',
          placeholder: 'Please describe the reason...',
          label: 'Note',
          maxLength: 3000,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        noteProgress: yup.string().required().label('Note'),
      },
    },
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
          label: 'Note',
          maxLength: 3000,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        rejectReason: yup.string().required().label('Note'),
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
          placeholder: 'Please describe the reason...',
          label: 'Note',
          maxLength: 3000,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        noteProgress: yup.string().required().label('Note'),
      },
    },
    confirm: {
      caption:
        'Once you confirm this, it will be processed and data will be sent to the customer automatically',
      confirmation: 'Are you sure want to approve this document?',
      success: 'Document successfully confirm',
      title: 'Please give note of confirm',
      schema: [
        {
          name: 'noteProgress',
          placeholder: 'Please describe the reason...',
          label: 'Note',
          maxLength: 3000,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        noteProgress: yup.string().required().label('Note'),
      },
    },
    suspend: {
      title: 'Please give note of suspend',
      confirmation: 'Are you sure want to suspend this Bulk?',
      success: 'Bulk successfuly suspended',
      schema: [
        {
          name: 'noteProgress',
          placeholder: 'Please describe the reason...',
          label: 'Note',
          maxLength: 3000,
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

    if (['checking'].includes(data?.activationStatus)) {
      if (isHaveAccess(feature, 'update_customerRequest')) {
        actions.push({
          children: 'Return',
          variant: 'ghost',
          onClick: onClickModalUpdateStatus({
            ...actionContent.returned,
            status: 'returned',
            open: true,
          }),
        });
        actions.push({
          children: 'Reject',
          variant: 'ghost',
          onClick: onClickModalUpdateStatus({
            ...actionContent.rejected,
            status: 'rejected',
            open: true,
          }),
        });
        actions.push({
          children: 'Approve',
          onClick: onClickModalUpdateStatus({
            ...actionContent.approve,
            status: 'checking order telkom',
            open: true,
          }),
        });
      }
    }
    if (['checking order telkom'].includes(data?.activationStatus)) {
      if (isHaveAccess(feature, 'update_checkingTelkom')) {
        actions.push({
          children: 'Confirm',
          onClick: onClickModalUpdateStatus({
            ...actionContent.confirm,
            status: 'checking order provider',
            open: true,
          }),
        });
      }
    }
    if (['checking order provider'].includes(data?.activationStatus)) {
      if (isHaveAccess(feature, 'update_checkingProvider')) {
        actions.push({
          children: 'Return',
          variant: 'ghost',
          onClick: onClickModalUpdateStatus({
            ...actionContent.returned,
            status: 'returned',
            open: true,
          }),
        });
        actions.push({
          children: 'Reject',
          variant: 'ghost',
          onClick: onClickModalUpdateStatus({
            ...actionContent.rejected,
            status: 'rejected',
            open: true,
          }),
        });
        actions.push({
          children: 'Input Parameter',
          onClick: onClickInputParams,
        });
      }
    }
    if (['input parameter'].includes(data?.activationStatus)) {
      if (isHaveAccess(feature, 'update_approve_input_parameter_bulk')) {
        actions.push({
          children: 'Approve',
          onClick: onClickUpdate,
        });
      }
    }
    if (['completed'].includes(data?.activationStatus)) {
      if (isHaveAccess(feature, 'update_suspend_request_bulk')) {
        actions.push({
          children: 'Suspend',
          onClick: onClickModalUpdateStatus({
            ...actionContent.suspend,
            status: 'suspend',
            open: true,
          }),
          variant: 'ghost',
        });
      }
      if (isHaveAccess(feature, 'update_complete')) {
        actions.push({
          children: 'Update',
          onClick: onClickInputParams,
        });
      }
    }
    if (['returned'].includes(data?.activationStatus)) {
      if (isHaveAccess(feature, 'update_complete')) {
        actions.push({
          children: 'Update',
          onClick: onClickModalUpdateStatus({
            ...actionContent.returnUpdated,
            status: 'returned',
            open: true,
          }),
        });
      }
    }

    return actions;
  };

  return {
    action,
    data,
    fetchDetail,
    setConfirmation,
    closeConfirmation,
    onCLickDownloadAll,
    modalUpdate,
    setModalUpdate,
    modalUpdateStatus,
    setModalUpdateStatus,
    fetchUpdateStatus,
    loading,
    modalInputParams,
    // modalUpdateStatus,
    onClickModalUpdateStatus,
    onCloseModalNotes,
    onCloseSuccess,
    orderNumber,
    // setConfirmation,
    setModalInputParams,
    // setModalUpdateStatus,
  };
};

export default useAction;
