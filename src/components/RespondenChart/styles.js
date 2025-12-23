import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = ({ loading }) => {
  return makeStyles(() => ({
    chartContainer: {
      height: 300,
      position: 'relative',
    },
    chartLabel: {
      transform: 'rotate(-90deg) !important',
    },
    legendContainer: {
      '& > div': {
        margin: '0px 8px',
      },
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: 60,
    },
    loadingOverlay: {
      alignItems: 'center',
      background: color.white,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      left: 0,
      opacity: loading ? 1 : 0,
      paddingBottom: 16,
      paddingLeft: 50,
      position: 'absolute',
      top: 0,
      transition: loading ? 'none' : '300ms',
      width: '100%',
      zIndex: loading ? 2 : -1,
    },
    notFoundContainer: {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
    },
    root: {
      maxWidth: 580,
      minWidth: 540,
    },
  }))();
};

export default useStyles;
