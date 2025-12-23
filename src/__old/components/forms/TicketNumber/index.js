import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import validate from './validate';
import asyncValidate from './asyncValidate';
import { connect } from 'react-redux';

const Styled = withStyles(styles)(Component);

export default connect(null, (dispatch) => ({ dispatch }))(
  reduxForm({
    form: 'ticketNumberForm',
    validate,
    asyncValidate,
    asyncChangeFields: ['ticketId'],
    enableReinitialize: true,
  })(Styled),
);
