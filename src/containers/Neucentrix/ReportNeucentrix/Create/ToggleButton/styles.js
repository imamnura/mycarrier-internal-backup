import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    buttonItem: {
      borderColor: color.general.mid,
      color: color.general.mid,
    },
    selected: {
      backgroundColor: `${color.primary.mid} !important`,
      color: `${color.white} !important`,
    },
  }))();
};

export default useStyles;
