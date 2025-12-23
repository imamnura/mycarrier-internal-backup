import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      padding: '32px 40px',
      width: 400,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    closeIcon: {
      '&:hover': {
        color: color.primary.main,
      },
      color: color.black,
      cursor: 'pointer',
      fontSize: '20px',
      position: 'absolute',
      right: '-10px',
      top: 0,
      zIndex: 1,
      lineHeight: '23px',
    },
  }))();
};

export default useStyles;
