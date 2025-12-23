import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    dashed: {
      border: `1px dashed ${color.general.light}`,
      marginRight: 16,
      minWidth: 380,
    },
  }))();
};

export default useStyles;
