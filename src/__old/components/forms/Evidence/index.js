import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';

import validate from './validate';

const Styled = withStyles(styles)(Component);

const ComponentTemp = reduxForm({
  form: 'evidence',
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  touchOnBlur: true,
  touchOnChange: true,
  validate,
})(Styled);

export default ComponentTemp;
