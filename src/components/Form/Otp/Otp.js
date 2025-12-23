import Button from '@components/Button';
import { TextField } from '@components/FormField';
import Typography from '@components/Typography';
import { Box, Dialog } from '@material-ui/core';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from './styles';
import PropTypes from 'prop-types';

const convertSeconds = (counter) => {
  const hour =
    Math.floor(counter / 3600) <= 0 ? '' : Math.floor(counter / 3600) + ' Hour';
  const minute =
    Math.floor((counter % 3600) / 60) <= 0
      ? ''
      : Math.floor((counter % 3600) / 60) + ' Minute';
  return `${hour} ${minute} ${(counter % 3600) % 60} Second`;
};

const Otp = (props) => {
  const { open, description, onClose, title, withCancel, id = '' } = props;

  const classes = useStyles();

  const {
    loading,
    control,
    onSubmit,
    timer,
    reSendOTP,
    formState: { isValid, isDirty },
  } = useAction(props);

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
        {loading || (timer < 0 && id?.match(/REFID/)) ? (
          <Typography variant="caption">Sending OTP...</Typography>
        ) : (
          <>
            {timer > 0 ? (
              <Typography variant="caption">
                Please wait{' '}
                {timer > 60 ? convertSeconds(timer) : `${timer} seconds`} to
                resend code again.
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
        {withCancel ? (
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
        ) : (
          ''
        )}
        <Button disabled={!isValid || !isDirty} ml={16} onClick={onSubmit}>
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
  withCancel: true,
};

Otp.propTypes = {
  caption: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  title: PropTypes.string,
  withCancel: PropTypes.bool,
};

export default Otp;
