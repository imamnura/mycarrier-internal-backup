import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    iconDot: {
      backgroundColor: color.blue.main,
      borderRadius: '50%',
      display: 'inline-block',
      height: '8px',
      marginRight: '8px',
      width: '8px',
    },
  }))();
};

export default useStyles;
