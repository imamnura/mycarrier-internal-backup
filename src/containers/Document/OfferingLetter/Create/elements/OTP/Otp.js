import Button from '@components/Button';
import { TextField } from '@components/FormField';
import Typography from '@components/Typography';
import { Box, Dialog } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';
import useAction from './hooks/useAction';

const Otp = (props) => {
  const {
    otpForm: open,
    description,
    closeOtp: onClose,
    loadingSendOtp: loading,
    title,
    onSubmitOtp: onSubmit,
  } = props;

  const { control, handleSubmit, isValid, timer, reSendOTP } = useAction(props);

  const classes = useStyles();

  return (
    <Dialog classes={{ paper: classes.dialogRoot }} maxWidth="lg" open={open}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography color="general-dark" inline variant="h5" weight="medium">
          {title}
        </Typography>
        {description && (
          <Box mt={2}>
            <Typography color="general-mid" variant="caption">
              {description}
            </Typography>
          </Box>
        )}
      </Box>
      <Box mt={4}>
        <TextField
          control={control}
          label="OTP Code"
          maxLength={6}
          name="otpCode"
          required
        />
      </Box>
      <Box mt={2} textAlign="center">
        {loading ? (
          <Typography variant="caption">Sending OTP...</Typography>
        ) : (
          <>
            {timer > 0 ? (
              <Typography variant="caption">
                Please wait {timer} seconds to resend code again.
              </Typography>
            ) : (
              <Typography variant="caption">
                Didn’t get OTP Code?{' '}
                <span className={classes.resendButton} onClick={reSendOTP}>
                  Resend code.
                </span>
              </Typography>
            )}
          </>
        )}
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <Button disabled={!isValid} ml={16} onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Box>
    </Dialog>
  );
};

Otp.defaultProps = {
  caption: '',
  description: '',
  open: false,
  title: '',
};

Otp.propTypes = {
  caption: PropTypes.string,
  description: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  title: PropTypes.string,
};

export default Otp;
