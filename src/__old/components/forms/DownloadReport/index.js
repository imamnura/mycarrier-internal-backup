import { reduxForm, formValueSelector } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import validate from './validate';
import { connect } from 'react-redux';

const Styled = withStyles(styles)(Component);

const selector = formValueSelector('downloadReport');

let FormComponent = reduxForm({
  form: 'downloadReport',
  keepDirtyOnReinitialize: true,
  validate,
})(Styled);

FormComponent = connect((state) => {
  return {
    type: selector(state, 'reportType') || '',
  };
})(FormComponent);

export default FormComponent;
