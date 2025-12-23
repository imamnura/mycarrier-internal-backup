import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import validate from './validate';
import { connect } from 'react-redux';

const Styled = withStyles(styles)(Component);

let ComponentTemp = reduxForm({
  form: 'wdsApprove',
  validate,
})(Styled);
ComponentTemp = connect(() => {
  return {
    initialValues: {
      respond: '',
    },
  };
})(ComponentTemp);

export default ComponentTemp;
