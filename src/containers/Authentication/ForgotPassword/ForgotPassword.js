import React from 'react';
import ForgotPassowrdForm from './elements/ForgotPasswordForm';
import NewPasswordForm from './elements/NewPasswordForm';
import { useRouter } from 'next/router';

const ForgotPassword = () => {
  const router = useRouter();
  const { code } = router.query;

  const View = code ? NewPasswordForm : ForgotPassowrdForm;

  return <View />;
};

export default ForgotPassword;
