import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { route } from '@configs';
import {
  baseRedirect,
  encrypt,
  setAccessToken,
  setRefreshToken,
  setUserData,
} from '@utils/common';
import generateToken from '@utils/generateToken';
import { login } from '../../../../_repositories/repositories';
import { isSubscribeFirebase } from '../utils';
import validation from '../validation';
import { hotjar } from 'react-hotjar';
import { setCookie } from 'nookies';
import { LOCATOR } from '@containers/Authentication/Login/test-locator';
import useAnalytics from '@utils/hooks/useAnalytics';
import { ENABLE_RECAPCTHA } from '@constants/env';

const useActions = (props) => {
  const [message, setMessage] = props.useMessage;
  const [loading, setLoading] = useState(false);

  const testLocator = LOCATOR;

  const history = useRouter();

  const captchaRef = useRef();

  const { control, handleSubmit } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const [mfaMethod, setMfaMethod] = useState({
    isOpen: false,
    data: {
      email: '',
      phoneNumber: '',
      signatureCode: '',
      sub: '',
    },
  });

  const [mfaOtp, setMfaOtp] = useState({
    isOpen: false,
    data: {
      method: '',
      email: '',
      phoneNumber: '',
      signatureCode: '',
      sub: '',
    },
  });

  const { trackEvent } = useAnalytics();

  const onSuccessLogin = (result) => {
    const { privileges, accessToken, refreshToken } = result.data;

    if (isSubscribeFirebase(privileges)) {
      // di postman bisa di web gabisa
      // await subscribeNotification(result.data.accessToken);
    }

    if (hotjar.initialized()) {
      hotjar.identify(result.data?.nik, {
        name: result.data?.fullName,
        email: result.data?.email,
        nik: result.data?.nik,
      });
    }

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUserData(result.data);

    //set cookies for gtm userId
    setCookie(undefined, 'userId', result.data.sub);

    baseRedirect();
  };

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      await captchaRef?.current?.reset();
      const captcha = await captchaRef?.current?.executeAsync();

      let payload = {
        username: await encrypt(values.username),
        password: await encrypt(values.password),
      };

      if (ENABLE_RECAPCTHA) {
        payload = {
          ...payload,
          recaptchaToken: captcha,
        };
      }

      const accessTokenGenerate = await generateToken();
      const accessKey = await encrypt(process.env.NEXT_PUBLIC_ACCESS_KEY);
      const result = await login(payload, accessTokenGenerate, accessKey);
      setLoading(false);
      if (result?.data?.isMfa) {
        setMfaMethod({
          isOpen: true,
          data: result.data,
        });
      } else {
        onSuccessLogin(result);
      }

      trackEvent('submit_login', {
        parent: result?.data?.isMfa ? 'mfa' : 'direct',
        feature: 'Account',
        success: 1,
        message: 'OK',
      });
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
      trackEvent('submit_login', {
        parent: 'direct',
        feature: 'Account',
        success: 0,
        message: error.message,
      });
    }
  };

  const redirectForgotPassword = () => {
    history.push(route.forgotPassword());
  };

  return {
    control,
    handleSubmit,
    loading,
    message,
    mfaMethod,
    mfaOtp,
    onSubmit,
    onSuccessLogin,
    redirectForgotPassword,
    setMfaMethod,
    setMfaOtp,
    testLocator,
    captchaRef,
  };
};

export default useActions;
