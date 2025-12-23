import Information from '@assets/icon-v2/Information';
import Typography from '@components/Typography';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import useStyles from './styles';

const InfoSbr = () => {
  const [alert, setAlert] = useState(true);

  const closeAlert = () => setAlert(false);

  const classes = useStyles();

  if (!alert) {
    return null;
  }

  return (
    <Alert
      className={classes.alert}
      icon={<Information className={classes.alertIcon} />}
      onClick={() => {
        window.open('https://opt.telkom.co.id/sbrbisnis/', '_blank');
      }}
      onClose={(e) => {
        e.stopPropagation();
        closeAlert();
      }}
    >
      <Typography variant="subtitle1">
        If the price is less than the minimum price, then you must{' '}
      </Typography>
      <Typography variant="subtitle1" weight="bold">
        make a SBR document then upload into BAKES using VPN Telkom.
      </Typography>
    </Alert>
  );
};

export default InfoSbr;
