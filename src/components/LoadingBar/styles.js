import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    progress: {
      height: 1,
      marginTop: -1,
    },
    bar: {
      background: color.primary.main,
    },
  }))();
};

export default useStyles;
