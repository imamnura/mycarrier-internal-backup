import { reduxForm, formValueSelector } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import validate from './validate';
import { connect } from 'react-redux';

const Styled = withStyles(styles)(Component);

const selector = formValueSelector('newBakesStep1');

let FormComponent = reduxForm({
  form: 'newBakesStep1',
  enableReinitialize: true,
  validate,
})(Styled);

FormComponent = connect((state) => {
  const { isLoadingLazy } = state.loading;
  const { bakesData } = state.bakesCreate;

  const { telkomPic, company } = bakesData || {};

  const defaultValue = bakesData
    ? {
        telkomPic,
        company,
      }
    : {};

  const com = selector(state, 'company') || company || {};
  const isCompanyValid = Boolean(
    !com?.name || !com?.contactName || !com?.contactPosition || !com?.alias,
  );

  return {
    telkomPic: selector(state, 'telkomPic.name')?.data || null,
    isCompanyValid,
    company: com,
    dropdownLoad: isLoadingLazy,
    initialValues: defaultValue,
  };
})(FormComponent);

export default FormComponent;
