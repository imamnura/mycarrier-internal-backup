import {
  sendOtpMFA,
  verifyOtpMfa,
} from '@containers/Authentication/Login/_repositories/repositories';
import { useEffect, useState } from 'react';
import moment from 'moment';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import useAnalytics from '@utils/hooks/useAnalytics';

const useActions = ({ data, onSuccess, onError, isOpen }) => {
  const { eventTimerStart, trackEvent } = useAnalytics();

  useEffect(() => {
    if (isOpen) {
      eventTimerStart('submit_otp');
    }
  }, [isOpen]);

  const [otp, setOtp] = useState('');

  const [code, setCode] = useState('');

  const [timer, setTimer] = useState('');
  const [counter, setCounter] = useState(-1);

  useEffect(() => {
    onSendOtp(false);
  }, []);

  useEffect(() => {
    let interval;
    if (moment(timer).diff(moment(), 'seconds') > 0) {
      interval = setInterval(() => {
        const diff = moment(timer).diff(moment(), 'seconds');
        if (diff === 0) {
          clearInterval(interval);
          setCounter(-1);
        } else {
          setCounter(diff);
        }
      }, 1000);
    } else {
      setCounter(-1);
    }

    // cleanup
    return () => clearInterval(interval);
  }, [timer]);

  const { setFailedAlert } = usePopupAlert();

  const [loading, setLoading] = useState(true);

  const onSendOtp = async (isResend = true) => {
    setLoading(true);
    const recentCounterData = JSON.parse(localStorage.getItem('mfa-otp')) ?? {};

    try {
      const result = await sendOtpMFA({
        data: {
          type: data.method,
          signatureCode: data.signatureCode,
        },
      });

      trackEvent('submit_request_otp', {
        parent: {
          'mfa-whatsapp': 'whatsapp',
          'mfa-email': 'email',
        }[data.method],
        feature: 'Account',
        success: 1,
        message: 'OK',
        action: isResend ? 'resend_otp' : 'otp',
      });

      const timer = moment(result.data.datetime);

      const counterData = JSON.stringify({
        ...recentCounterData,
        [data.sub]: {
          code: result.data.signatureCode,
        },
      });

      setTimer(timer);

      localStorage.setItem('mfa-otp', counterData);
      setCode(result.data.signatureCode);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      const isCounter = error.details.message.match(/:(\d+)s/);
      const message = error.message + '\n' + error.details.message;

      if (isCounter) {
        if (isCounter[1] > 60) {
          const duration = moment.duration(isCounter[1], 'seconds');
          trackEvent('submit_request_otp', {
            parent: {
              'mfa-whatsapp': 'whatsapp',
              'mfa-email': 'email',
            }[data.method],
            feature: 'Account',
            success: 0,
            message: message,
            action: isResend ? 'resend_otp' : 'otp',
          });
          setFailedAlert({
            message: message.replace(
              /:(\d+)s/,
              `${duration.minutes()} Minute ${duration.seconds()} Second`,
            ),
          });

          if (isCounter[1] < 2820) {
            onError();
          }
        }

        const timer = moment(new Date()).add(isCounter[1], 'seconds');

        setTimer(timer);
      } else {
        trackEvent('submit_request_otp', {
          parent: {
            'mfa-whatsapp': 'whatsapp',
            'mfa-email': 'email',
          }[data.method],
          feature: 'Account',
          success: 0,
          message: message,
          action: isResend ? 'resend_otp' : 'otp',
        });
        setFailedAlert({
          message,
        });
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const onSubmit = async () => {
    const recentCounterData = JSON.parse(localStorage.getItem('mfa-otp')) ?? {};
    const strCode = recentCounterData[data.sub]?.code ?? '';
    try {
      const result = await verifyOtpMfa({
        data: { otp, signatureCode: code || strCode },
      });
      onSuccess(result);
      trackEvent('submit_otp', {
        feature: 'Account',
        success: 1,
        message: 'OK',
      });
    } catch (error) {
      if (
        error.message ===
        'Maximum OTP verification attempts exceeded. Please try again with a new code'
      ) {
        onError();
      }
      setFailedAlert({
        message: error.message,
      });
      trackEvent('submit_otp', {
        feature: 'Account',
        success: 0,
        message: error.message,
      });
    }
  };

  return {
    counter: moment(counter * 1000).format('mm:ss'),
    isCounterActive: counter > -1,
    otp,
    setOtp,
    onSubmit,
    onSendOtp,
    loading,
  };
};

export default useActions;
