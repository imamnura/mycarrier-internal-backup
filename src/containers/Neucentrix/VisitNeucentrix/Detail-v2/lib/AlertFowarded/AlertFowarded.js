import React from 'react';
import PropTypes from 'prop-types';
import Information from '@assets/icon-v2/Information';
import { Alert } from '@material-ui/lab';
import useStyles from './styles';
import { pickAlertCopywriting } from '../../utils';

const AlertFowarded = ({ data }) => {
  const classes = useStyles();

  return (
    <Alert
      className={classes.alert}
      icon={<Information className={classes.alertIcon} />}
    >
      {pickAlertCopywriting(data)}
    </Alert>
  );
};

AlertFowarded.defaultProps = {
  data: [],
};

AlertFowarded.propTypes = {
  data: PropTypes.array,
};

export default AlertFowarded;
