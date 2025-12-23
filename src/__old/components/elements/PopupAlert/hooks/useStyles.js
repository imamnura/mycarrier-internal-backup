import { makeStyles } from '@material-ui/core/styles';
import theme from '@styles/theme';

const useStyles = makeStyles(() => ({
  icon: {
    color: theme.color.green.main,
    fontSize: 64,
    margin: 20,
  },
  iconFail: {
    color: theme.color.primary.main,
    fontSize: 64,
    margin: 20,
  },
  iconInfo: {
    color: theme.color.yellow.main,
    fontSize: 64,
    margin: 20,
  },
  root: {
    width: 432,
  },
}));

export default useStyles;
