import { Dialog } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import useAction from './hooks/useAction';
import CompanyValidation from './elements/CompanyValidation';
import ChooseOption from './elements/ChooseOption';
import PickSalesTeam from './elements/PickSalesTeam';
import OtherRecepient from './elements/OtherRecepient';

const FormValidate = (props) => {
  const { show } = props;

  const { activeStep, formProps } = useAction(props);

  const classes = useStyles();

  const renderContent = () => {
    if (activeStep === 0) {
      return <CompanyValidation {...formProps} />;
    } else if (activeStep === 1) {
      return <ChooseOption {...formProps} />;
    } else if (activeStep == '2SalesTeam') {
      return <PickSalesTeam {...formProps} />;
    } else if (activeStep == '2OtherRecepient') {
      return <OtherRecepient {...formProps} />;
    }
  };

  return (
    !!show && (
      <Dialog classes={{ paper: classes.dialogRoot }} open>
        {renderContent()}
      </Dialog>
    )
  );
};

FormValidate.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default FormValidate;
