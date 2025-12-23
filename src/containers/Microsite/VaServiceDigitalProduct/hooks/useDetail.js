import { getFileInformation, isPreviewable } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getDetailVaService,
  postOTPVaService,
  postVerificationOTPVaService,
} from '../_repositories/repositories';
import { dataMapping } from '../utils';
import useActionVaService from './useActionVaService';
import generateToken from '@utils/generateToken';

const useDetail = () => {
  const router = useRouter();
  const {
    query: { id: referenceId, userId },
  } = router;

  const { setDocumentViewer } = useDocumentViewer();
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const { closeConfirmation } = usePopupConfirmation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otpForm, setOtpForm] = useState(false);
  const [modalMultiAttachment, setModalMultiAttachment] = useState(null);

  const openOtp = () => setOtpForm(true);

  const closeOtp = () => setOtpForm(false);

  const otpRepository = {
    send: postOTPVaService('send', userId),
    reSend: postOTPVaService('reSend', userId),
  };

  const onSubmitOtp = async ({ otpCode }) => {
    setLoadingAlert();

    try {
      const accessTokenGenerate = await generateToken();
      const result = await postVerificationOTPVaService(
        {
          referenceId,
          otp: otpCode,
          userId: userId,
          signatureCode: sessionStorage.getItem('signatureCode'),
        },
        accessTokenGenerate,
      );

      if (result.data) {
        sessionStorage.setItem('isOtpValid', '1');
        closeConfirmation();
        closeOtp();
        setSuccessAlert({ message: '' });
        fetchDetail();
      }
    } catch (error) {
      closeConfirmation();
      setFailedAlert({
        message: error.message,
      });
    }
  };

  const fetchDetail = async () => {
    setLoading(true);

    try {
      const accessTokenGenerate = await generateToken();
      const result = await getDetailVaService(
        referenceId,
        accessTokenGenerate,
        {
          userId: userId,
        },
      );
      setData({
        ...result.data,
        product: 'vaservice',
      });
    } catch (error) {
      if (['Not verify OTP'].includes(error.message)) {
        openOtp();
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (referenceId) {
      if (sessionStorage.getItem('isOtpValid') === '1') {
        fetchDetail();
      } else {
        openOtp();
      }
    }
  }, [referenceId]);

  const onPreviewWorklog =
    ({ fileName, fileUrl }) =>
    () => {
      const { name, extension } = getFileInformation(fileUrl);

      if (isPreviewable(extension)) {
        setDocumentViewer({
          title: fileName || name,
          url: fileUrl,
        });
      } else {
        window.open(fileUrl);
      }
    };

  const openModalMultiAttachment = (files) => () => {
    setModalMultiAttachment({
      title: 'View Attachment',
      listAttachment: files,
    });
  };

  const productAction =
    {
      vaservice: useActionVaService({ data, fetchDetail }),
    }[data?.product] || {};

  return {
    referenceId,
    data: dataMapping(data),
    onPreviewWorklog,
    modalMultiAttachment,
    openModalMultiAttachment,
    setModalMultiAttachment,
    loading,
    fetchDetail,
    productAction,
    otpForm,
    closeOtp,
    otpRepository,
    onSubmitOtp,
    openOtp,
  };
};

export default useDetail;
