import { route } from '@configs';
import generateToken from '@utils/generateToken';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { forgotPasssword } from '../../../../_repositories/repositories';
import validation from '../validation';
import { ENABLE_RECAPCTHA } from '@constants/env';

const useActions = () => {
  const history = useRouter();
  const { setSuccessAlert } = usePopupAlert();

  const captchaRef = useRef();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { control, handleSubmit } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await captchaRef?.current?.reset();
      const captcha = await captchaRef?.current?.executeAsync();

      const accessTokenGenerate = await generateToken();

      let payload = { ...data };

      if (ENABLE_RECAPCTHA) {
        payload = {
          ...payload,
          recaptchaToken: captcha,
        };
      }

      await forgotPasssword(payload, accessTokenGenerate);
      setSuccessAlert({
        message:
          'Please check recovery link that has been sent to your email to change the new password',
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.message === 'Email Not Found') {
        setMessage('Your email not registered, please type another one');
      } else {
        setMessage(error.message);
      }
    }
  };

  const redirectLogin = () => {
    history.push(route.login());
  };

  const redirectPortal = () => {
    window.open('https://portal.telkom.co.id/');
  };

  return {
    captchaRef,
    control,
    handleSubmit,
    loading,
    message,
    onSubmit,
    redirectLogin,
    redirectPortal,
  };
};

export default useActions;
