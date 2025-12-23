import Button from '@components/Button';
import { TextField } from '@components/FormField';
import Typography from '@components/Typography';
import { Box, Grid } from '@material-ui/core';
import useStyles from '../../styles';
import MFAMethod from '../MFAMethod';
import useActions from './hooks/useActions';
import MFAOTP from '../MFAOTP';
import ReCAPTCHA from 'react-google-recaptcha';
import { CAPTCHA_KEY, ENABLE_RECAPCTHA } from '@constants/env';

const LoginForm = (props) => {
  const classes = useStyles();
  const {
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
  } = useActions(props);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid component={Box} container py={5} spacing={2} width="100%">
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Email or NIK"
              maxLength={40}
              name="username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Password"
              name="password"
              type="password"
            />
          </Grid>
          <Grid align="right" item xs={12}>
            <Typography
              children="Forgot Password?"
              className={classes.link}
              color="primary-main"
              onClick={redirectForgotPassword}
              variant="caption"
              weight="bold"
            />
          </Grid>
        </Grid>
        <Box mb={2}>
          <Typography
            children={message || ' '}
            color="primary-main"
            variant="caption"
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            children="LOG IN"
            loading={loading}
            type="submit"
            id={testLocator.submit}
          />
        </Box>
        {ENABLE_RECAPCTHA && (
          <ReCAPTCHA ref={captchaRef} size="invisible" sitekey={CAPTCHA_KEY} />
        )}
      </form>
      {mfaMethod?.isOpen && (
        <MFAMethod
          isOpen={mfaMethod.isOpen && !mfaOtp.isOpen}
          data={mfaMethod.data}
          onSubmit={(data) => {
            setMfaOtp({ isOpen: true, data });
          }}
          onClose={() =>
            setMfaMethod({
              isOpen: false,
              data: { email: '', phoneNumber: '', signatureCode: '', sub: '' },
            })
          }
        />
      )}
      {mfaOtp?.isOpen && (
        <MFAOTP
          isOpen={mfaOtp.isOpen}
          data={mfaOtp.data}
          onSuccess={onSuccessLogin}
          onClose={() => {
            setMfaOtp({
              isOpen: false,
              data: {
                email: '',
                phoneNumber: '',
                signatureCode: '',
                method: '',
                sub: '',
              },
            });
          }}
          onError={() => {
            setMfaOtp({
              isOpen: false,
              data: {
                email: '',
                phoneNumber: '',
                signatureCode: '',
                method: '',
                sub: '',
              },
            });
            setMfaMethod({
              isOpen: false,
              data: { email: '', phoneNumber: '', signatureCode: '', sub: '' },
            });
          }}
        />
      )}
    </>
  );
};

export default LoginForm;
