import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import validate from './validate';
import { connect } from 'react-redux';

const Styled = withStyles(styles)(Component);

let FormComponent = reduxForm({
  form: 'submitUsernamePassword',
  enableReinitialize: true,
  validate,
})(Styled);

FormComponent = connect((state) => {
  const { dataMRTGLoginData } = state.requestMRTGLoginData;

  const { username, password } = dataMRTGLoginData || {};

  const defaultValue = dataMRTGLoginData
    ? {
        username,
        password,
      }
    : {};

  return {
    initialValues: defaultValue,
  };
})(FormComponent);

export default FormComponent;

// export default connect(
//   null,
//   dispatch => ({ dispatch })
// )(reduxForm({ form: 'submitUsernamePassword', validate })(Styled));
