import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    dashed: {
      border: `1px dashed ${color.general.light}`,
      marginRight: 16,
      flexGrow: 1,
    },
  }))();
};

export default useStyles;
