import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import validate from './validate';

const Styled = withStyles(styles)(Component);

export default reduxForm({ form: 'return', validate })(Styled);
