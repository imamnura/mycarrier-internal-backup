import Button from '@components/Button';
import { TextField } from '@components/FormField';
import Typography from '@components/Typography';
import { image } from '@configs';
import { CAPTCHA_KEY, ENABLE_RECAPCTHA } from '@constants/env';
import Auth from '@layouts/Auth';
import { Box, Divider } from '@material-ui/core';
import ReCAPTCHA from 'react-google-recaptcha';
import useStyles from '../../styles';
import useActions from './hooks/useActions';

const ForgotPasswordForm = () => {
  const {
    control,
    handleSubmit,
    loading,
    message,
    onSubmit,
    redirectLogin,
    redirectPortal,
    captchaRef,
  } = useActions();

  const classes = useStyles();

  return (
    <Auth>
      <div className={classes.centered}>
        <img src={image.logoSquare} alt="logo-square" />
        <Box mt={5}>
          <Typography
            children="Type your email below"
            variant="h4"
            weight="medium"
          />
        </Box>
        <Box mt={2}>
          <Typography
            children="We will send you an email with a link that you can use to reset your password"
            color="general-mid"
            variant="subtitle1"
          />
        </Box>
        <Box pt={5} width="100%">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              control={control}
              error={!!message}
              helperText={message}
              label="Email"
              maxLength={40}
              name="email"
            />
            <Box display="flex" justifyContent="center" mt={5}>
              <Button children="SEND LINK" loading={loading} type="submit" />
            </Box>
            {ENABLE_RECAPCTHA && (
              <ReCAPTCHA
                ref={captchaRef}
                size="invisible"
                sitekey={CAPTCHA_KEY}
              />
            )}
          </form>
        </Box>
        <Box my={5} width="100%">
          <Divider />
        </Box>
        <Typography color="general-mid" variant="caption">
          If you have Email or NIK Telkom, please change your password in
          <Typography
            children=" Portal Telkom now"
            className={classes.link}
            color="primary-main"
            onClick={redirectPortal}
            variant="caption"
            weight="bold"
          />
          .
        </Typography>
        <Box my={5} width="100%">
          <Divider />
        </Box>
        <Typography color="general-mid" variant="caption">
          Remember your account?
          <Typography
            children=" Log in now"
            className={classes.link}
            color="primary-main"
            onClick={redirectLogin}
            variant="caption"
            weight="bold"
          />
          .
        </Typography>
      </div>
    </Auth>
  );
};

export default ForgotPasswordForm;
