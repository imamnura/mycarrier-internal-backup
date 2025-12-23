import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import validate from './validate';
import { connect } from 'react-redux';

const Styled = withStyles(styles)(Component);

export default connect(null, (dispatch) => ({ dispatch }))(
  reduxForm({ form: 'updateStatusForm', validate })(Styled),
);
