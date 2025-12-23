import { Dialog } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import useAction from './hooks/useAction';
import PickSalesTeam from '../FormValidate/elements/PickSalesTeam';

const ReassignSalesTeam = (props) => {
  const { show } = props;

  const { reAssignProps } = useAction(props);

  const classes = useStyles();

  return (
    !!show && (
      <Dialog classes={{ paper: classes.dialogRoot }} open>
        <PickSalesTeam {...reAssignProps} {...props} />
      </Dialog>
    )
  );
};

ReassignSalesTeam.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default ReassignSalesTeam;
