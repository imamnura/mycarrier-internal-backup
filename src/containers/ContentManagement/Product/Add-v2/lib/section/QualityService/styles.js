import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    contentImage: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-end',
      marginRight: '5px',
    },
    disabledSection: {
      backgroundColor: color.white,
      height: '100%',
      left: '0',
      opacity: '0.8',
      position: 'absolute',
      top: '0',
      width: '100%',
      zIndex: '1',
    },
  }))();
};

export default useStyles;
