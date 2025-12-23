import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = ({ data, loading, categorizeIndicator }) => {
  return makeStyles(() => ({
    axes: {
      height: 40,
      marginTop: -4,
      paddingRight: 13,
    },
    barContainer: {
      maxHeight: categorizeIndicator ? 500 : 400,
      overflowY: data?.length > 5 ? 'scroll' : 'hidden',
      overflowX: 'hidden',
      width: '100%',
    },
    chart: {
      height: categorizeIndicator
        ? data?.length * 50 + 50
        : data?.length * 40 + 40,
    },
    chartContainer: {
      position: 'relative',
      width: '100%',
    },
    leftLabel: {
      transform: 'rotate(-180deg)',
      writingMode: 'vertical-rl',
      textOrientation: 'mixed',
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
      height: '100%',
      justifyContent: 'center',
    },
    root: {
      alignItems: 'center',
      display: 'flex',
      minHeight: data?.length ? 0 : 200,
    },
  }))();
};

export default useStyles;
