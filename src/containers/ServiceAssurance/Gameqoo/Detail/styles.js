import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles((theme) => ({
    boxNPS: {
      '& span': {
        lineHeight: '48px',
        textAlign: 'center',
      },

      borderRadius: 8,
      height: 'fit-content',
      marginTop: 8,
      marginRight: 16,
      padding: '0 16px',
      textAlign: 'center',
      width: 'fit-content',
    },
    boxNPSGreen: {
      backgroundColor: '#3BA064',
    },
    boxNPSRed: {
      backgroundColor: color.primary.main,
    },
    boxNPSYellow: {
      backgroundColor: '#FAB005',
    },
    boxNPSYellow2: {
      backgroundColor: '#FAB005',
    },
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  }))();
};

export default useStyles;
