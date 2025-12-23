import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  getDataMicrositeBAKES,
  postOTPApproval,
  postVerificationOTPApproval,
  updateStatusPurchaseOrder,
} from '../_repositories/repositories';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { errorTitle, pickStatus } from '../constants';
import generateToken from '@utils/generateToken';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';

const useActions = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setFailedAlert, setSuccessAlert, setLoadingAlert } = usePopupAlert();
  const { closeConfirmation, setConfirmation } = usePopupConfirmation();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState({});
  const [modalUpdateStatus, setModalUpdateStatus] = useState(false);
  const [otpForm, setOtpForm] = useState(false);

  // const openOtp = () => setOtpForm(true);

  const closeOtp = () => setOtpForm(false);

  const otpRepository = {
    send: postOTPApproval('send', data?.bakesId),
    reSend: postOTPApproval('reSend', data?.bakesId),
  };

  const fetchDetail = async (micrositeId) => {
    try {
      setLoading(true);
      const accessTokenGenerate = await generateToken();
      const { data } = await getDataMicrositeBAKES(
        { hash: micrositeId },
        accessTokenGenerate,
      );
      setData({
        ...data,
      });
    } catch (e) {
      setData(null);
      if (errorTitle[e?.code]) {
        setError({
          description: e?.message,
          message: errorTitle[e?.code],
          status: pickStatus(e?.message),
        });
      } else {
        setError({
          message: e?.message,
          status: pickStatus(e?.message),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => fetchDetail(id);

  const onSubmit = (data) => {
    // if (
    //   modalUpdateStatus?.status === 'customer approval'
    //   // &&
    //   // data.isLastReviewer &&
    //   // data.approvalType === 'digital'
    // ) {
    //   openOtp(data);
    // } else {
    fetchUpdateStatus(data);
    // }
  };

  const fetchVerifyOtp = (otpCode) => async () => {
    setLoadingAlert();
    try {
      const accessTokenGenerate = await generateToken();
      const result = await postVerificationOTPApproval(
        {
          otpCode,
          bakesId: data?.bakesId,
        },
        accessTokenGenerate,
      );
      if (result.success) {
        fetchUpdateStatus(otpForm);
        closeConfirmation();
        closeOtp();
      }
    } catch (error) {
      closeConfirmation();
      setFailedAlert({
        message: error.message,
      });
    }
  };

  const onSubmitOtp = ({ otpCode }) => {
    setConfirmation({
      message: modalUpdateStatus.confirmation,
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchVerifyOtp(otpCode) },
      ],
    });
  };

  const fetchUpdateStatus = async (data) => {
    const payload = {
      ...data,
      status: modalUpdateStatus?.status,
      hash: id,
    };

    try {
      const accessTokenGenerate = await generateToken();
      await updateStatusPurchaseOrder(payload, accessTokenGenerate);
      setSuccessAlert({
        message: modalUpdateStatus?.success,
        onClose: onClose,
      });
    } catch (e) {
      setFailedAlert({
        message: e?.message,
      });
    }
  };

  const onClickReject = () => {
    setModalUpdateStatus({
      schema: [
        {
          name: 'notes',
          placeholder: 'Please describe the reason..',
          label: 'Reason',
          maxLength: 160,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        notes: yup.string().required().label('Reason'),
      },
      open: true,
      title: 'Please Give Reason Of Reject',
      caption:
        'Once you returned this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to reject this new BAKES request?',
      success: 'New BAKES request successfully rejected',
      status: 'rejected',
    });
  };

  const onClickReturn = () => {
    setModalUpdateStatus({
      schema: [
        {
          name: 'notes',
          placeholder: 'Please describe the reason..',
          label: 'Reason',
          maxLength: 160,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        notes: yup.string().required().label('Reason'),
      },
      open: true,
      title: 'Please Give Reason Of Return',
      caption:
        'Once you returned this, it will be process and data will be sent to customer automatically.',
      confirmation: 'Are you sure want to return this new BAKES request?',
      success: 'New BAKES request successfully returned',
      status: 'returned',
    });
  };

  const onClickApprove = () => {
    setModalUpdateStatus({
      schema: [
        {
          name: 'notes',
          placeholder: 'Please describe the note..',
          label: 'Note',
          maxLength: 160,
          minRows: 3,
          multiline: true,
          required: true,
        },
      ],
      validation: {
        notes: yup.string().required().label('Note'),
      },
      open: true,
      title: 'Please Give Note Of Approve',
      caption:
        'Once you rejected this, it will be process and data will be sent to customer automatically.',
      success: 'New BAKES request successfully approved',
      confirmation: 'Are you sure want to approve this new BAKES request?',
      status: 'telkom approval',
    });
  };

  const action = [
    { label: 'Reject', onClick: onClickReject },
    { label: 'Return', onClick: onClickReturn },
    { label: 'Approve', onClick: onClickApprove },
  ];

  useEffect(() => {
    if (id) {
      fetchDetail(id);
    }
  }, [id]);

  return {
    action,
    data,
    error,
    fetchDetail,
    isLoading,
    modalUpdateStatus,
    setModalUpdateStatus,
    onClickApprove,
    onClose,
    onSubmit,
    closeOtp,
    otpForm,
    otpRepository,
    onSubmitOtp,
  };
};

export default useActions;
