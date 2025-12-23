import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    alert: {
      background: color.yellow.soft,
      minHeight: 48,
      borderRadius: 8,
      alignItems: 'center',
    },
    alertIcon: {
      height: 24,
      width: 24,
      color: color.yellow.main,
    },
  }))();
};

export default useStyles;
