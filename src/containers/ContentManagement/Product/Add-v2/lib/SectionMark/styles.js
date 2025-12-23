import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles((theme) => ({
    sectionMark: {
      backgroundColor: color.primary.main,
      width: 'fit-content',
      maxWidth: '35%',
      padding: '12px 16px',
      borderRadius: '0 0 20px 0',
      [theme.breakpoints.down('xs')]: {
        maxWidth: '100%',
      },
    },
    switchMark: {
      display: 'flex',
      backgroundColor: color.primary.soft,
      width: 'fit-content',
      maxWidth: '35%',
      padding: '8px 16px',
      borderRadius: '0 0 0 20px',
      [theme.breakpoints.down('xs')]: {
        maxWidth: '100%',
      },
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: '2',
    },
  }))();
};

export default useStyles;
