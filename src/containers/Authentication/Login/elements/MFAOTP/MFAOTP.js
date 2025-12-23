import Button from '@components/Button';
import OTPInput from '@components/OTPInput';
import Typography from '@components/Typography';
import { Modal } from '@legion-ui/core';
import { Box, ButtonBase } from '@material-ui/core';
import useActions from './hooks/useActions';

const MFAOTP = (props) => {
  const { isOpen, onClose, data } = props;
  const {
    counter,
    isCounterActive,
    loading,
    onSendOtp,
    onSubmit,
    otp,
    setOtp,
  } = useActions(props);

  return (
    <Modal show={isOpen} title="Two Step Verification" onClose={onClose}>
      <Box sx={{ textAlign: 'left', mt: -2, mb: 2, color: '#3B525C' }}>
        <Typography variant="body2">
          Enter the OTP code we just sent you to{' '}
          {data.method === 'mfa-email' ? data.email : data.phoneNumber}
        </Typography>
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 16,
            width: 480,
          }}
        >
          <div style={{ marginBottom: -16 }}>
            <OTPInput value={otp} onChange={setOtp} numInputs={6} />
          </div>
          <Typography variant="body2">Didn’t get the OTP code?</Typography>
          <div style={{ display: 'flex', gap: 4 }}>
            {loading ? (
              <Typography variant="caption">Sending OTP...</Typography>
            ) : (
              <>
                <ButtonBase
                  disabled={isCounterActive || loading}
                  onClick={onSendOtp}
                >
                  <Typography
                    variant="buttonS"
                    color={isCounterActive ? 'general-light' : 'primary-main'}
                  >
                    Resend new code
                  </Typography>
                </ButtonBase>
                {isCounterActive && (
                  <Typography variant="caption">{counter}</Typography>
                )}
              </>
            )}
          </div>
        </div>
      </Box>
      <Button disabled={!(otp.length === 6)} onClick={onSubmit}>
        SEND
      </Button>
    </Modal>
  );
};

export default MFAOTP;
