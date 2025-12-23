import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    root: {
      color: color.white,
      backgroundColor: color.primary.main,
      alignItems: 'center',
      transition: '200ms',
      '&:hover': {
        backgroundColor: color.primary.mid,
      },
      '&:disabled': {
        backgroundColor: color.general.light,
        color: color.white,
        cursor: 'not-allowed',
      },
    },
  }))();
};

export default useStyles;
