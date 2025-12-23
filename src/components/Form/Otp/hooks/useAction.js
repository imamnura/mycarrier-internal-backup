import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import validation from '../validation';

const useAction = (props) => {
  const { control, handleSubmit, formState } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(props.onSubmit);

  const { repository, id } = props;

  const [otpCounter, setOtpCounter] = useState({
    mock: moment().add(10, 'seconds').toJSON(),
  });
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const parseTime = (text) => {
    const minLeft = text?.match(/\d+m/)[0]?.replace('m', '');
    const secLeft = text?.match(/\d+s/)[0]?.replace('s', '');

    return moment(new Date()).add(minLeft, 'minutes').add(secLeft, 'seconds');
  };

  // type: 'send' | 'reSend'
  const fetchSendOTP = async (type) => {
    setLoading(true);

    try {
      const res = await repository[type]();
      if (res?.data?.signatureCode) {
        sessionStorage.setItem('signatureCode', res?.data?.signatureCode);
      }
      await setOtpCounter({
        [id]: moment(new Date()).add(1, 'minutes'),
      });
      await setLoading(false);
    } catch (error) {
      if (error?.message?.match(/maximum/) && id?.match(/REFID/)) {
        await setOtpCounter({
          [id]: parseTime(error.message),
        });
      }
      setLoading(false);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const [timer, setTimer] = useState(-1);

  const getDiffCounter = () => {
    if (JSON.parse(sessionStorage.getItem('counterOTP'))?.[id] >= 0) {
      return JSON.parse(sessionStorage.getItem('counterOTP'))?.[id] - 1;
    }

    if (otpCounter[id]) {
      let difference = new Date(otpCounter[id]) - new Date();
      return Math.floor(difference / 1000);
    }

    return -1;
  };

  useEffect(() => {
    if (getDiffCounter() <= 0 && props.open) {
      fetchSendOTP('send');
    }
  }, [props.open]);

  useEffect(() => {
    let counter = null;

    counter = setInterval(() => {
      let second = getDiffCounter();
      if (second >= 0) {
        setTimer(second);
      } else {
        clearInterval(counter);
      }
      sessionStorage.setItem('counterOTP', JSON.stringify({ [id]: second }));
    }, 1000);

    return () => {
      clearInterval(counter);
    };
  }, [otpCounter]);

  const reSendOTP = () => {
    fetchSendOTP('reSend');
  };

  return {
    control,
    loading,
    onSubmit,
    timer,
    reSendOTP,
    formState,
  };
};

export default useAction;
