import { route } from '@configs';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { dateFormat } from '@utils/parser';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getDetailApprovalOfferingLetter,
  postOTPApproval,
  postVerificationOTPApproval,
  putApprovalOfferingLetter,
} from '../../_repositories/repositories';

const useAction = () => {
  const router = useRouter();

  const hash = router.query.id;

  const [data, _setData] = useState(null);

  const setData = (d) => {
    if (d) {
      _setData({
        ...d,
        updatedAt: dateFormat({ date: d.updatedAt, type: 'date', empty: '-' }),
        offeringLetterId: d?.offeringLetterId || d?.quotationId,
        isLastReviewer:
          d.agreement.length > 1
            ? Boolean(d.agreement[d.agreement.length - 2].note)
            : true,
      });
    } else {
      _setData(d);
    }
  };

  const [loading, setLoading] = useState(true);

  const [stateType, setStateType] = useState(null);

  useEffect(() => {
    if (data?.approvalStepStatus) {
      if (data?.status !== 'telkom approval') {
        setStateType(data?.status);
      } else {
        setStateType('approved');
      }
    }
  }, [data]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const result = await getDetailApprovalOfferingLetter(hash);
      const resData = result.data;
      if (resData.status === 'draft') {
        setData(null);
      } else {
        setData(resData);
      }
      setLoading(false);
    } catch (error) {
      setData(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hash) {
      fetchDetail();
    }
  }, [hash]);

  const redirect = () =>
    router.push(route.offeringLetter('detail', data.offeringLetterId));

  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();

  const [approvalForm, setApprovalForm] = useState({
    type: 'approve',
    title: '-',
    caption: '-',
    open: false,
  });

  const closeApprovalForm = () =>
    setApprovalForm({ ...approvalForm, open: false });

  const fetchUpdateStatus = (data) => async () => {
    setLoadingAlert();
    try {
      const result = await putApprovalOfferingLetter(hash, data);
      setData({ approvalStepStatus: true, ...result.data });
      setSuccessAlert({ message: approvalForm.successMessage });
      closeApprovalForm();
      closeConfirmation();
    } catch (error) {
      closeConfirmation();
      setFailedAlert({ message: error.message });
    }
  };

  const [otpForm, setOtpForm] = useState(false);

  const openOtp = () => setOtpForm(true);

  const closeOtp = () => setOtpForm(false);

  const otpRepository = {
    send: postOTPApproval('send', data?.offeringLetterId),
    reSend: postOTPApproval('reSend', data?.offeringLetterId),
  };

  const fetchVerifyOtp = (otpCode) => async () => {
    setLoadingAlert();
    try {
      const result = await postVerificationOTPApproval({
        otpCode,
        offeringLetterId: data?.offeringLetterId,
      });
      const resultStatus = await putApprovalOfferingLetter(hash, {
        note: '',
        status: 'approved',
      });
      if (result.success && resultStatus.data) {
        setData({ approvalStepStatus: true, ...resultStatus.data });
        setSuccessAlert({ message: approvalForm.successMessage });
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
      message: approvalForm.confirmation,
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchVerifyOtp(otpCode) },
      ],
    });
  };

  const onApprovalAction = (status) => () => {
    const formApprovalContent = {
      rejected: {
        type: 'rejected',
        statusPayload: 'rejected',
        title: 'Please give note of reject',
        caption:
          'Once you rejected this, it will be process and data will be sent to customer automatically.',
        successMessage: 'New Offering letter successfully rejected',
        confirmation:
          'Are you sure want to reject this offering letter request?',
        open: true,
      },
      returned: {
        type: 'returned',
        statusPayload: 'returned',
        title: 'Please give note of return',
        caption:
          'Once you returned this, it will be process and data will be sent to customer automatically.',
        successMessage: 'New Offering letter successfully returned',
        confirmation:
          'Are you sure want to return this offering letter request?',
        open: true,
      },
      approved: {
        type: 'approve',
        statusPayload: 'telkom approval',
        title: 'Please give note of approve',
        caption:
          'Once you approved this, it will be process and data will be sent to customer automatically.',
        successMessage: 'New Offering letter successfully approved',
        confirmation:
          'Are you sure want to approve this offering letter request?',
        open: true,
      },
    }[status];

    if (status === 'approved' && data.isLastReviewer) {
      openOtp();
      setApprovalForm({
        ...formApprovalContent,
        open: false,
      });
    } else {
      setApprovalForm(formApprovalContent);
    }
  };

  const onSubmitFormApproval =
    (status) =>
    ({ reason }) => {
      setConfirmation({
        message: approvalForm.confirmation,
        action: [
          { children: 'no', variant: 'ghost', onClick: closeConfirmation },
          {
            children: 'yes',
            onClick: fetchUpdateStatus({ note: reason, status }),
          },
        ],
      });
    };

  return {
    data,
    loading,
    redirect,
    stateType,
    onApprovalAction,
    approvalForm,
    closeApprovalForm,
    onSubmitFormApproval,
    closeOtp,
    otpForm,
    otpRepository,
    onSubmitOtp,
  };
};

export default useAction;
