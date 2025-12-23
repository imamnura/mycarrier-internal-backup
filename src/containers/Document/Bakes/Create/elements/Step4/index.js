import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import validate from './validate';
import { connect } from 'react-redux';

const Styled = withStyles(styles)(Component);

let FormComponent = reduxForm({
  form: 'newBakesStep4',
  enableReinitialize: true,
  validate,
})(Styled);

FormComponent = connect((state) => {
  const { bakesData } = state.bakesCreate;

  const {
    billingMethod,
    customerBilling,
    paymentDueDate,
    paymentDueNote,
    termOfPayment,
  } = bakesData || {};

  const bill = Array.isArray(billingMethod)
    ? billingMethod
    : billingMethod?.split(' ');

  const defaultValue = bakesData
    ? {
        termOfPayment,
        customerBilling,
        paymentDueDate,
        paymentDueNote,
        billingMethod: bill,
      }
    : {
        billingMethod: bill,
      };

  return {
    data: {
      companyAlias: bakesData?.company?.alias || '',
      telkomAlias: bakesData?.telkomPic?.alias || '',
    },
    initialValues: defaultValue,
  };
})(FormComponent);

export default FormComponent;
