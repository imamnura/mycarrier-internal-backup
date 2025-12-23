import { route } from '@configs';
import usePopupAlert from '@utils/hooks/usePopupAlert';
// import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getDetailOfferingLetter,
  updateStatusOfferingLetter,
  // postOTP,
  // postVerificationOTP,
} from '../../_repositories/repositories';

const useActions = (props) => {
  const router = useRouter();
  const {
    query: { id: offeringLetterId },
  } = router;

  const { feature } = props;

  const { setFailedAlert } = usePopupAlert();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const { closeConfirmation } =
  //   usePopupConfirmation();

  // const [otpForm, setOtpForm] = useState(false);

  // const openOtp = () => setOtpForm(true);

  // const closeOtp = () => setOtpForm(false);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const result = await getDetailOfferingLetter(offeringLetterId);
      setData(result.data);
      setLoading(false);
    } catch (error) {
      setData(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (offeringLetterId) {
      fetchDetail();
    }
  }, [offeringLetterId]);

  const onEdit = async () => {
    try {
      await updateStatusOfferingLetter({
        offeringLetterId,
        data: {
          note: '',
          status: 'draft',
        },
      });

      router.push(route.offeringLetter('create', offeringLetterId));
    } catch (error) {
      setFailedAlert({
        message: 'Failed to update offering letter',
      });
    }
  };

  // const onSubmitOtp = async ({ otpCode }) => {
  //   setLoadingAlert();
  //   try {
  //     const result = await postVerificationOTP({ otpCode, offeringLetterId });
  //     const resultStatus = await updateStatusOfferingLetter({
  //       offeringLetterId,
  //       data: { note: '', status: 'approved' },
  //     });
  //     if (result.success && resultStatus.data) {
  //       closeConfirmation();
  //       closeDocumentViewer();
  //       setSuccessAlert({
  //         message: 'Offering letter successfully submitted',
  //         onClose: () =>
  //           router.replace(
  //             route.offeringLetter(
  //               'detail',
  //               resultStatus.data.offeringLetterId,
  //             ),
  //           ),
  //       });
  //     }
  //   } catch (error) {
  //     closeConfirmation();
  //     if (error?.message === 'Document has been signed') {
  //       setSuccessAlert({
  //         message: error?.message || 'Document has been signed',
  //         onClose: () =>
  //           router.replace(route.offeringLetter('detail', offeringLetterId)),
  //       });
  //     } else {
  //       setFailedAlert({
  //         message: error?.message,
  //       });
  //     }
  //   }
  // };

  // const otpRepository = {
  //   send: postOTP('send', offeringLetterId),
  //   reSend: postOTP('reSend', offeringLetterId),
  // };

  return {
    data,
    feature,
    loading,
    // openOtp,
    // closeOtp,
    onEdit,
    // onSubmitOtp,
    // otpForm,
    // otpRepository,
    offeringLetterId,
  };
};

export default useActions;
