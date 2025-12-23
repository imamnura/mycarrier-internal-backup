import { ACTIONS } from '../../../../constants';
import fetch from '../../../utils/fetch';
import moment from 'moment';
import { AUTH } from '../../../configs';
import Router from 'next/router';

export function sendOTP(id, key, endpoint, setSnackbar, isResend, callback) {
  return (dispatch) => {
    const options = {
      method: 'POST',
      url: isResend ? endpoint.resend : endpoint.send,
      data: {
        [key]: id,
      },
      headers: {
        Authorization: AUTH.BASIC,
      },
    };
    dispatch(loadingAction());
    fetch(options)
      .then(async () => {
        callback(60);
        await dispatch(
          setOTPCounter({
            [id]: moment(new Date()).add(1, 'minutes'),
          }),
        );
        await dispatch(doneLoadingAction());
      })
      .catch(async ({ data, message }) => {
        // callback(0);
        const { endOTP } = data || {};
        if (endOTP) {
          await dispatch(
            setOTPCounter({
              [id]: moment(new Date()).add(1, 'minutes'),
            }),
          );
        } else {
          await setSnackbar(message, { variant: 'error' });
        }
        await dispatch(doneLoadingAction());
      });
  };
}

export function verifyOTP(
  id,
  key,
  endpoint,
  otpCode,
  setLoading,
  note,
  callback,
) {
  let others = {};

  if (note) {
    others.note = note;
  }

  return () => {
    const options = {
      method: 'POST',
      url: endpoint.verify,
      data: {
        [key]: id,
        otpCode,
        ...others,
      },
      headers: {
        Authorization: AUTH.BASIC,
      },
    };
    setLoading(true);
    fetch(options)
      .then(() => {
        setLoading(false);
        callback(true);
      })
      .catch(({ message }) => {
        setLoading(false);
        callback(false, message);
        if (message === 'Document has been signed')
          Router.reload(window.location.pathname);
      });
  };
}

const setOTPCounter = (data) => ({
  type: ACTIONS.OTP_COUNTER,
  data,
});

function loadingAction() {
  return { type: ACTIONS.LOADING_LAZY };
}

function doneLoadingAction() {
  return { type: ACTIONS.DONE_LOADING_LAZY };
}
