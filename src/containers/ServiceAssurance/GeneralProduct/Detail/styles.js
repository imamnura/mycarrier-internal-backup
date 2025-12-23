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
    boxEstimateTime: {
      backgroundColor: '#cfe0fc',
      borderRadius: '6px',
      padding: '14px',
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      borderColor: '#3071d9',
      fontSize: '0.875rem' /* 14px */,
      lineHeight: '1.25rem' /* 20px */,
    },
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  }))();
};

export default useStyles;
