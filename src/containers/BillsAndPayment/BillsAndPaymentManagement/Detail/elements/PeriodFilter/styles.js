import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    title: {
      color: color.general.main,
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: '28px',
      textTransform: 'capitalize',
    },
  }))();
};

export default useStyles;
