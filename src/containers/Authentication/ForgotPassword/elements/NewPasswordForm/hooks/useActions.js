import { route } from '@configs';
import generateToken from '@utils/generateToken';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  changePassword,
  verifyCodeReset,
} from '../../../../_repositories/repositories';
import validation from '../validation';
import { ENABLE_RECAPCTHA } from '@constants/env';

const useActions = () => {
  const history = useRouter();
  const { code } = history.query;

  const captchaRef = useRef();

  const { setSuccessAlert } = usePopupAlert();

  const [validCode, setValidCode] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [message, setMessage] = useState('');

  const { control, handleSubmit } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const redirectForgotPassword = () => {
    history.push(route.forgotPassword());
  };

  const redirectLogin = () => {
    history.push(route.login());
  };

  const onSubmit = async (v) => {
    setLoading(true);

    await captchaRef?.current?.reset();
    const captcha = await captchaRef?.current?.executeAsync();

    let data = {
      newPassword: v.password,
      ...validCode,
    };

    if (ENABLE_RECAPCTHA) {
      data = {
        ...data,
        recaptchaToken: captcha,
      };
    }

    try {
      const accessTokenGenerate = await generateToken();
      await changePassword(data, accessTokenGenerate);
      setSuccessAlert({
        message:
          'Your account succesfully recovered. Login now with new password.',
        buttonLabel: 'Login Now',
        onClose: redirectLogin,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };

  const verifyCode = async () => {
    setLoadingPage(true);
    try {
      const accessTokenGenerate = await generateToken();
      const result = await verifyCodeReset({ code }, accessTokenGenerate);
      setValidCode(result.data);
      setLoadingPage(false);
    } catch (error) {
      setValidCode(null);
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    verifyCode();
  }, [code]);

  return {
    control,
    handleSubmit,
    loading,
    loadingPage,
    message,
    onSubmit,
    redirectForgotPassword,
    redirectLogin,
    validCode,
    captchaRef,
  };
};

export default useActions;
