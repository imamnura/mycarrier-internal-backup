import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    actionDivider: {
      background: color.general.light,
      height: 60,
      marginLeft: 4,
      marginRight: 20,
      width: 1,
    },
  }))();
};

export default useStyles;
