import { reduxForm, formValueSelector } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import validate, { isApprovalHasValue } from './validate';
import asyncValidate from './asyncValidate';
import { connect } from 'react-redux';

const Styled = withStyles(styles)(Component);

const selector = formValueSelector('newBakesStep5');

let FormComponent = reduxForm({
  form: 'newBakesStep5',
  enableReinitialize: true,
  persistentSubmitErrors: true,
  validate,
  asyncValidate,
  asyncChangeFields: [
    'telkomApproval[].email',
    'customerApproval[].email',
    'approvalType',
  ],
})(Styled);

FormComponent = connect((state) => {
  const { bakesData } = state.bakesCreate;

  const { telkomApproval, customerApproval, approvalType } = bakesData || {};

  const type = selector(state, 'approvalType') || '';

  const approvalTelkom = selector(state, 'telkomApproval') || [];
  const approvalCustomer = selector(state, 'customerApproval') || [];

  const defaultValue =
    bakesData?.telkomApproval?.length > 0
      ? {
          approvalType,
          telkomApproval,
          customerApproval,
        }
      : {
          telkomApproval: [{}],
          customerApproval: [{ phoneNumber: '+62' }],
        };

  const approvalHasValue =
    isApprovalHasValue(approvalTelkom) || isApprovalHasValue(approvalCustomer);

  return {
    approvalHasValue: approvalHasValue,
    approvalType: type,
    initialValues: defaultValue,
  };
})(FormComponent);

export default FormComponent;
