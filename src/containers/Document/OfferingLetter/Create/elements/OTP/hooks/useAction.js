import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import validation from '../validation';
// import { useRouter } from 'next/router';

const useAction = (props) => {
  const { id, fetchSendOTP, otpCounter } = props;
  // const router = useRouter();
  const [timer, setTimer] = useState(-1);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  // const { setLoadingAlert, setFailedAlert, setSuccessAlert } = usePopupAlert();

  const getDiffCounter = () => {
    if (JSON.parse(localStorage.getItem('counterOTP'))?.[id] >= 0) {
      return JSON.parse(localStorage.getItem('counterOTP'))?.[id] - 1;
    }

    if (otpCounter[id]) {
      let difference = new Date(otpCounter[id]) - new Date();
      return Math.floor(difference / 1000);
    }

    return -1;
  };

  // useEffect(() => {
  //   if (getDiffCounter() <= 0 && props.open) {
  //     // fetchSendOTP('send');
  //   }
  // }, [props.open]);

  useEffect(() => {
    let counter = null;

    counter = setInterval(() => {
      let second = getDiffCounter();
      if (second >= 0) {
        setTimer(second);
      } else {
        clearInterval(counter);
      }
      localStorage.setItem('counterOTP', JSON.stringify({ [id]: second }));
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
    handleSubmit,
    isValid,
    timer,
    reSendOTP,
  };
};

export default useAction;
