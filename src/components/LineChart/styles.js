import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

export const theme = {
  fontFamily: 'Titillium Web',
  fontSize: 14,
  grid: {
    line: {
      stroke: '#D2DADE',
    },
  },
  labels: {
    text: {
      fontSize: 10,
    },
  },
  axis: {},
  textColor: color.general.main,
};

const useStyles = ({ loading, height }) => {
  return makeStyles(() => ({
    leftLabel: {
      transform: 'rotate(-90deg) !important',
    },
    root: {
      minHeight: height,
      position: 'relative',
      width: '100%',
    },
    chartContainer: {
      alignItems: 'center',
      display: 'flex',
      height: height - 40,
      // width: '100%',
      paddingRight: 24,
    },
    legendContainer: {
      '& > div': {
        margin: '0px 8px',
      },
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: 60,
      zIndex: 999,
    },
    tooltip: {
      alignItems: 'center',
      background: color.white,
      // border: `1px solid ${color.general.soft}`,
      borderRadius: 2,
      boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
      display: 'flex',
      height: 30,
      padding: '0px 8px',
    },
    loadingOverlay: {
      alignItems: 'center',
      background: color.white,
      display: 'flex',
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
      height: '300px',
      justifyContent: 'center',
    },
  }))();
};

export default useStyles;
