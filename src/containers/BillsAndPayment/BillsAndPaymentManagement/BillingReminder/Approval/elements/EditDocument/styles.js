import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    actionButton: {
      alignItems: 'center',
      display: 'flex',
      gap: 16,
    },
    header: {
      alignItems: 'center',
      backgroundColor: 'white',
      display: 'flex',
      height: 70,
      padding: 16,
      top: 0,
      width: '100%',
      zIndex: 1000,
    },
    icon: {
      '&:hover': {
        color: color.primary.main,
      },
      cursor: 'pointer',
      transition: '200ms',
    },
    paper: {
      maxHeight: '100vh',
    },
    title: {
      flexGrow: 1,
    },
    wrapper: {
      height: 'calc(100% - 70px)',
      position: 'relative',
    },
  }))();
};

export default useStyles;
