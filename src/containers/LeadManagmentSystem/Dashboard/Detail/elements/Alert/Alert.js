/* eslint-disable react/no-danger */
import React from 'react';
import Information from '@assets/icon-v2/Information';
import Typography from '@components/Typography';
import { Alert as MuiAlert } from '@material-ui/lab';
import useStyles from './styles';
import { useDetailData } from '../../utils';
import { alertLabel } from './utils';

const Alert = () => {
  const classes = useStyles();
  const { data } = useDetailData();

  return (
    <MuiAlert
      className={classes.alert}
      icon={<Information className={classes.alertIcon} />}
    >
      <Typography color="primary-main" variant="subtitle1">
        <span dangerouslySetInnerHTML={{ __html: alertLabel(data?.status) }} />
      </Typography>
    </MuiAlert>
  );
};

export default Alert;
