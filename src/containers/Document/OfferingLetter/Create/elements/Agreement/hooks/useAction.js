import { useEffect, useState } from 'react';
import moment from 'moment';
import { route } from '@configs';
import {
  generateOfferingLetter,
  postDraftOfferingLetter,
  postVerificationOTP,
  updateStatusOfferingLetter,
  postOTP,
} from '@containers/Document/OfferingLetter/_repositories/repositories';
import { cleanObject } from '@utils/common';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import validation from '../validation';

const useAction = (props) => {
  const router = useRouter();
  const { data, setTab: _setTab, updateData } = props;

  const [otpForm, setOtpForm] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(null);
  const [loadingSendOtp, setLoadingSendOtp] = useState(null);

  const [otpCounter, setOtpCounter] = useState({
    mock: moment().add(10, 'seconds').toJSON(),
  });

  const { id: offeringLetterId } = router.query;

  const { control, handleSubmit, reset, watch, formState } = useForm({
    defaultValues: {
      agreement: [{ phoneNumber: '+62' }],
      // agreement: [{ phoneNumber: '+62' }, { phoneNumber: '+62' }],
    },
    resolver: validation,
    mode: 'onChange',
  });

  const signatureType = watch('signatureType');

  const { enqueueSnackbar } = useSnackbar();
  const { setConfirmation: _setConfirmation, closeConfirmation } =
    usePopupConfirmation();
  const { setDocumentViewer, closeDocumentViewer } = useDocumentViewer();
  const {
    setSuccessAlert,
    setLoadingAlert,
    setFailedAlert,
    setData: setAlertData,
  } = usePopupAlert();

  const setConfirmation = (val) => () => _setConfirmation(val);
  const openOtp = () => setOtpForm(true);
  const closeOtp = () => setOtpForm(false);

  const onDefaultDataChange = () => {
    const { agreement } = data || {};

    reset({
      agreement: agreement?.length
        ? agreement.map(({ name, email, position, phoneNumber }) => ({
            name,
            email,
            position,
            phoneNumber,
          }))
        : [{ phoneNumber: '+62' }],
      // : [{ phoneNumber: '+62' }, { phoneNumber: '+62' }],
      // signatureType,
    });
  };

  // useEffect(() => {
  //   if (signatureType == 'am_approval') {
  //     setValue('agreement', [agreement[0]]);
  //   } else {
  //     if (agreement.length < 2) {
  //       setValue('agreement', [agreement[0], { phoneNumber: '+62' }]);
  //     } else {
  //       setValue('agreement', agreement);
  //     }
  //   }
  // }, [signatureType]);

  const setTab = (tab) => {
    closeConfirmation();
    _setTab(tab);
  };

  const fetchUpdateStatus = async (_status = 'signing on progress') => {
    setLoadingAlert();

    const data = {
      note: '',
      status: _status,
    };

    try {
      await updateStatusOfferingLetter({
        offeringLetterId,
        data,
      });
      setSuccessAlert({
        message: 'Offering letter successfully submitted',
        onClose: () => {
          closeDocumentViewer();
          router.replace(route.offeringLetter('detail', offeringLetterId));
        },
      });
      closeConfirmation();
    } catch (error) {
      setFailedAlert({
        message: error.message,
      });
      closeConfirmation();
    }
  };

  const fetchSendOTP = async (type) => {
    setLoadingSendOtp(true);
    if (type === 'send') {
      setLoadingAlert();
    }

    try {
      await postOTP({ type, offeringLetterId });
      await setOtpCounter({
        [offeringLetterId]: moment(new Date()).add(1, 'minutes'),
      });
      if (type === 'send') {
        openOtp();
        setAlertData({
          variant: 'loading',
          message: '',
        });
      }
    } catch (error) {
      if (error?.message?.toLowerCase() === 'document has been signed') {
        closeConfirmation();
        setSuccessAlert({
          message: error.message,
          onClose: () => {
            closeDocumentViewer();
            router.replace(route.offeringLetter('detail', offeringLetterId));
          },
        });
      } else {
        setFailedAlert({
          message: error.message,
        });
      }
    } finally {
      setLoadingSendOtp(false);
    }
  };

  const fetchVerificationOtp = async ({ otpCode }, callback) => {
    closeOtp();
    setLoadingAlert();

    try {
      await postVerificationOTP({
        offeringLetterId,
        otpCode,
      });
      callback(true);
    } catch (error) {
      if (error?.message?.toLowerCase() === 'document has been signed') {
        setSuccessAlert({
          message: error.message,
          onClose: () =>
            router.replace(
              route.offeringLetter('detail', data?.offeringLetterId),
            ),
        });
      } else {
        setFailedAlert({
          message: error.message,
          onClose: openOtp,
        });
      }
    }
  };

  const fetchGenerateOfferingLetter = async () => {
    try {
      const result = await generateOfferingLetter(offeringLetterId);
      setDocumentViewer({
        action: [
          {
            children: 'submit',
            onClick: setConfirmation({
              message: 'Are you sure want to submit this offering letter?',
              action: [
                {
                  children: 'no',
                  variant: 'ghost',
                  onClick: closeConfirmation,
                },
                {
                  children: 'yes',
                  onClick: () => {
                    closeConfirmation();
                    fetchSendOTP('send');
                  },
                },
              ],
            }),
          },
        ],
        title: 'Review document',
        url: result.data.documentUrl,
      });
      setSubmitLoading(null);
    } catch (error) {
      setSubmitLoading(null);
    }
  };

  const handleTabChange = ({ type, destinationStep }) => {
    if (type == 'next') {
      setSubmitLoading('next');
      fetchGenerateOfferingLetter();
    } else if (type === 'previous') {
      setTab(destinationStep);
    } else {
      setSubmitLoading(null);
    }
  };

  // type: 'next' | 'draft' | 'previous
  const fetchDraftOfferingLetter = async (values, type, destinationStep) => {
    setSubmitLoading(type);

    const _payload = {
      data: values,
      step: 4,
    };

    const payload = cleanObject(_payload);

    try {
      const result = await postDraftOfferingLetter(offeringLetterId, payload);
      await updateData(result.data);
      await handleTabChange({ type, destinationStep });
      enqueueSnackbar('Document saved as draft.');
    } catch (error) {
      setSubmitLoading(null);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const submitHandler = ({ type, destinationStep }) => {
    if (!formState.isDirty && formState.isValid) {
      return () => handleTabChange({ type, destinationStep });
    } else if (!formState.isValid && type === 'previous') {
      return () =>
        _setConfirmation({
          message: 'Are you sure that you want leave this form?',
          action: [
            { children: 'no', variant: 'ghost', onClick: closeConfirmation },
            { children: 'yes', onClick: () => setTab(destinationStep) },
          ],
        });
    }

    return handleSubmit((val) =>
      fetchDraftOfferingLetter(val, type, destinationStep),
    );
  };

  const onSubmit = (type) => {
    const destinationStep = {
      previous: 3,
      draft: 4,
    }[type];

    return submitHandler({ type, destinationStep });
  };

  const onStepperClick = (_destinationStep) => {
    const destinationStep = _destinationStep + 1;
    const type = 'previous';
    submitHandler({ type, destinationStep })();
  };

  const onSubmitOtp = ({ otpCode }) => {
    fetchVerificationOtp({ otpCode }, () => fetchUpdateStatus('approved'));
  };

  useEffect(() => {
    onDefaultDataChange();
  }, [data]);

  return {
    otpProperty: {
      fetchSendOTP,
      otpCounter,
      closeOtp,
      onSubmitOtp,
      otpForm,
      loadingSendOtp,
    },
    fetchUpdateStatus,
    control,
    offeringLetterId,
    onStepperClick,
    onSubmit,
    // otpRepository,
    signatureType,
    submitLoading,
  };
};

export default useAction;
