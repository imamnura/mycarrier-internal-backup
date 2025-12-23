import Person404 from '@assets/ilustration-v2/Person404';
import Button from '@components/Button';
import { TextField } from '@components/FormField';
import Loading from '@components/Loading';
import Typography from '@components/Typography';
import { image } from '@configs';
import { CAPTCHA_KEY, ENABLE_RECAPCTHA } from '@constants/env';
import Auth from '@layouts/Auth';
import { Box, Grid } from '@material-ui/core';
import ReCAPTCHA from 'react-google-recaptcha';
import useStyles from '../../styles';
import useActions from './hooks/useActions';

const NewPasswordForm = () => {
  const {
    control,
    handleSubmit,
    loading,
    message,
    onSubmit,
    loadingPage,
    redirectForgotPassword,
    validCode,
    captchaRef,
  } = useActions();

  const classes = useStyles();

  if (loadingPage) {
    return (
      <Box className={classes.centered} height="100vh">
        <Loading color="primary" size="large" />
      </Box>
    );
  }

  if (!validCode) {
    return (
      <Box className={classes.centered} height="100vh">
        <Box className={classes.centered} maxWidth="400px">
          <Person404 className={classes.notFoundImage} />
          <Typography
            children="Sorry.."
            color="general-dark"
            variant="h4"
            weight="medium"
          />
          <Box pb={5} pt={3} textAlign="center">
            <Typography
              children="Link of set new password has been expired. If you want to change you password now, please click button below."
              color="general-mid"
              variant="subtitle1"
            />
          </Box>
          <Button
            children="Change Password Now"
            onClick={redirectForgotPassword}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Auth>
      <div className={classes.centered}>
        <img src={image.logoSquare} alt="logo-square" />
        <Box mt={5}>
          <Typography
            children="Set new password"
            variant="h4"
            weight="medium"
          />
        </Box>
        <Box mt={2}>
          <Typography
            children="Type and retype your new password"
            color="general-mid"
            variant="subtitle1"
          />
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid component={Box} container pt={5} spacing={2} width="100%">
            <Grid item xs={12}>
              <TextField
                control={control}
                label="Password"
                name="password"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                control={control}
                label="Retype New Password"
                name="rePassword"
                type="password"
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
            <Button children="CONFIRM" loading={loading} type="submit" />
          </Box>
          {ENABLE_RECAPCTHA && (
            <ReCAPTCHA
              ref={captchaRef}
              size="invisible"
              sitekey={CAPTCHA_KEY}
            />
          )}
        </form>
      </div>
    </Auth>
  );
};

export default NewPasswordForm;
