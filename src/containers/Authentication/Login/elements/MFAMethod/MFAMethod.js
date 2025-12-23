import Mail from '@assets/icon-v2/Mail';
import Whatsapp from '@assets/icon-v2/Whatsapp';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { Modal } from '@legion-ui/core';
import { Box } from '@material-ui/core';
import useAnalytics from '@utils/hooks/useAnalytics';
import { useEffect, useState } from 'react';

const MFAMethod = (props) => {
  const { isOpen, onClose, data, onSubmit } = props;
  const [method, setMethod] = useState('');

  const { eventTimerStart } = useAnalytics();

  useEffect(() => {
    if (isOpen) {
      eventTimerStart('submit_request_otp');
    }
  }, [isOpen]);

  return (
    <Modal show={isOpen} title="Two Step Verification" onClose={onClose}>
      <Box sx={{ textAlign: 'left', mt: -2, mb: 2, color: '#3B525C' }}>
        <Typography variant="body2">
          We will send you an OTP for verification. Please choose where you want
          the OTP to be sent:
        </Typography>
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            width: 480,
          }}
        >
          {[
            data.phoneNumber
              ? {
                  type: 'mfa-whatsapp',
                  label: 'Whatsapp',
                  info: data.phoneNumber,
                  Icon: Whatsapp,
                }
              : null,
            data.email
              ? {
                  type: 'mfa-email',
                  label: 'Email',
                  info: data.email,
                  Icon: Mail,
                }
              : null,
          ]
            .filter((x) => !!x)
            .map(({ type, Icon, label, info }) => (
              <Box
                key={type}
                sx={{
                  border:
                    method === type ? '1px solid #3366FF' : '1px solid #B3C3CA',
                  bgcolor: method === type ? '#f5f7ff' : 'transparent',
                  borderRadius: 16,
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setMethod(type);
                }}
              >
                <Icon style={{ height: 40, width: 40 }} />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Typography variant="body1" weight="bold">
                    {label}
                  </Typography>
                  <Box
                    sx={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '100%',
                      bgcolor: '#B3C3CA',
                    }}
                  />
                  <Typography variant="body1" weight="bold">
                    {info}
                  </Typography>
                </Box>
              </Box>
            ))}
        </div>
      </Box>
      <Button
        disabled={!method}
        onClick={() => {
          onSubmit({ method, ...data });
        }}
      >
        SEND
      </Button>
    </Modal>
  );
};

export default MFAMethod;
