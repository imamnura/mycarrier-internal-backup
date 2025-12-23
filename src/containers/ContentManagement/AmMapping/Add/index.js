import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import useStyles from './hooks/useStyles';

export default withStyles(useStyles)(Component);
