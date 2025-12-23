import { makeStyles } from '@material-ui/core/styles';
import color from '@styles/color';

const useStyles = makeStyles(() => ({
  content: {
    border: `1px solid ${color.general.soft}`,
    borderRadius: 10,
    padding: '12px 16px',
    overflowX: 'auto',
  },
  list: {
    paddingLeft: 18,
    paddingBottom: 8,
    margin: 0,
  },
  logo: {
    border: `1px solid ${color.general.soft}`,
    borderRadius: 5,
    padding: 8,
    width: 50,
  },
  mainWrapper: {
    backgroundColor: 'white',
    border: `1px solid ${color.general.soft}`,
    borderRadius: 10,
    padding: 32,
  },
}));

export default useStyles;
