import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import validate from './validate';
import { connect } from 'react-redux';

const Styled = withStyles(styles)(Component);

let ComponentTemp = reduxForm({
  form: 'checkingOrderForm',
  validate,
})(Styled);

ComponentTemp = connect((state) => {
  const {
    detailLinkActivation: { ip },
  } = state.linkDetail;
  return {
    initialValues: {
      ip: ip,
      port: '',
      username: '',
      password: '',
    },
  };
})(ComponentTemp);

export default ComponentTemp;
