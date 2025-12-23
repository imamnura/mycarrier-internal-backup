import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Text from '../../elements/Text';
import TextField from '../../elements/TextField';
import Button from '../../elements/Button';
import { useSnackbar } from 'notistack';

export default function Component(props) {
  const {
    actions,
    classes,
    endpoint,
    id,
    keyId,
    note,
    onClose,
    onSubmit,
    otpCounter,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const timerLocalStorage =
    JSON.parse(localStorage.getItem('counterOTP'))?.[id] || 0;

  const [OTP, setOTP] = useState('');
  const [loading, setLoading] = useState('');
  const [timer, setTimer] = useState(timerLocalStorage);

  let counter = null;

  useEffect(() => {
    if (getDiffCounter() <= 0) {
      actions.sendOTP(id, keyId, endpoint, enqueueSnackbar, false, setTimer);
    }
  }, []);

  useEffect(() => {
    handleCounter();
    return () => {
      clearInterval(counter);
    };
  }, [otpCounter]);

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

  const handleCounter = () => {
    counter = setInterval(() => {
      let second = getDiffCounter();
      if (second >= 0) {
        setTimer(second);
      } else {
        clearInterval(counter);
      }
      localStorage.setItem('counterOTP', JSON.stringify({ [id]: second }));
    }, 1000);
  };

  const resendOTP = () => {
    actions.sendOTP(id, keyId, endpoint, enqueueSnackbar, true, setTimer);
  };

  const onVerify = () => {
    actions.verifyOTP(id, keyId, endpoint, OTP, setLoading, note, (e, m) => {
      if (e) {
        onSubmit();
      } else {
        enqueueSnackbar(m, { variant: 'error' });
      }
    });
  };

  const bottomWording = () => {
    if (props.isSendLoading) {
      return <Text variant="caption">Please Wait...</Text>;
    }

    if (timer > 0) {
      return (
        <Text variant="caption">
          Please wait {timer} seconds to resend code again.
        </Text>
      );
    }

    return (
      <>
        <Text variant="caption">Didn’t get OTP Code? </Text>
        <Text
          className={classes.resendOTP}
          color="primary"
          onClick={resendOTP}
          variant="caption"
        >
          Resend code.
        </Text>
      </>
    );
  };

  return (
    <Grid container spacing={2} style={{ padding: '8px 24px 16px 24px' }}>
      <Grid align="center" item xs={12}>
        <Text variant="subtitle2">Please input your OTP code</Text>
      </Grid>
      <Grid align="center" style={{ padding: 8 }} xs={12}>
        <Text color="grey" variant="caption">
          You will get Peruri Digital Sign OTP code, please input for approval
        </Text>
      </Grid>
      <Grid xs={12}>
        <TextField
          input={{ value: OTP, onChange: (e) => setOTP(e.target.value) }}
          label="OTP Code"
        />
      </Grid>
      <Grid align="center" style={{ paddingTop: 32 }} xs={12}>
        {bottomWording()}
      </Grid>
      <Grid align="center" style={{ paddingTop: 32 }} xs={12}>
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button disabled={!OTP} isLoading={loading} onClick={onVerify}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

Component.propTypes = {
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  endpoint: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  isSendLoading: PropTypes.bool.isRequired,
  keyId: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  otpCounter: PropTypes.object.isRequired,
};
