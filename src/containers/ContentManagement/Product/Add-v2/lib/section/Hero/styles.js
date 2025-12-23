import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    icon: {
      width: 56,
      height: 56,
    },
    wrapper: {
      position: 'relative',
      backgroundColor: color.general.main,
      overflow: 'hidden',
    },
    arrow: {
      height: 10,
      marginLeft: 10,
      width: 10,
      color: color.white,
    },
    logoName: {
      fontWeight: 500,
      fontSize: 20,
      letterSpacing: '0.0015em',
      lineHeight: '23px',
      textAlign: 'center',
    },
    title: {
      fontWeight: 500,
      fontSize: 34,
      letterSpacing: '0.0025em',
      lineHeight: '40px',
      textAlign: 'center',
    },
    descCenter: {
      zIndex: '1',
      textAlign: 'center !important',
      '& > div > p': {
        textAlign: 'center !important',
      },
      // '& ul': {
      //   backgroundColor: 'transparent !important',
      //   color: `${color.white} !important`
      // }
    },
    descLeft: { zIndex: '1', textAlign: 'left' },
  }))();
};

export default useStyles;
