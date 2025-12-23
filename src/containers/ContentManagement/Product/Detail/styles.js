import { makeStyles } from '@material-ui/core/styles';
import color from '@styles/color';

const useStyles = makeStyles(() => ({
  button: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  clickableRow: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  disabled: {
    cursor: 'default !important',
    opacity: '40%',
  },
  insertBtn: {
    '&:hover': {
      cursor: 'pointer',
    },
    '& span': {
      marginLeft: '0.75rem',
    },
    alignItems: 'center',
    color: color.green.main,
    display: 'flex',
    margin: '1rem 0',
  },
  verticalDivider: {
    height: '40%',
    margin: '0 8px',
    padding: '8px 0',
  },
}));

export default useStyles;
