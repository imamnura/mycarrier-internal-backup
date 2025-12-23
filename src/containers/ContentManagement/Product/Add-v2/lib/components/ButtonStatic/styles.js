import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    button: {
      '&:hover': {
        color: color.primary.dark,
      },
      textTransform: 'uppercase',
      fontWeight: 700,
      color: color.primary.main,
      cursor: 'pointer',
    },
  }))();
};

export default useStyles;
