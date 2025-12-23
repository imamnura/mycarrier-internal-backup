import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    '@keyframes blinker': {
      '0%': {
        opacity: 1,
      },
      '50%': {
        opacity: 0.5,
      },
      '100%': {
        opacity: 1,
      },
    },
    circle: {
      borderRadius: '50%',
      display: 'inline-block',
      minHeight: 10,
      height: 10,
      margin: '2px 5px',
      width: 10,
    },
    divider: {
      backgroundColor: color.general.light,
      height: 1,
      marginBottom: 12,
      marginTop: 12,
      width: '164px',
    },
    greenCircle: {
      animation: '1s linear infinite',
      animationName: '$blinker',
      backgroundColor: color.green.main,
    },
    redCircle: {
      backgroundColor: color.primary.main,
    },
  }))();
};

export default useStyles;
