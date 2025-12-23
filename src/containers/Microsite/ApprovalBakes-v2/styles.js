import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    number: {
      alignItems: 'center',
      background: color.primary.main,
      borderRadius: '100%',
      display: 'flex',
      justifyContent: 'center',
      minHeight: 16,
      minWidth: 16,
      width: 16,
    },
    root: {
      display: 'flex',
      alignItems: 'center',
    },
  }))();
};

export default useStyles;
