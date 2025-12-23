import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    wrapper: {
      border: `1px solid ${color.general.light}`,
      padding: 16,
      borderRadius: 5,
    },
  }))();
};

export default useStyles;
