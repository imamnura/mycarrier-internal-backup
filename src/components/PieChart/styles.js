import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

export const theme = {
  axis: {
    label: {
      text: {
        fontSize: 10,
      },
    },
  },
  fontFamily: 'Titillium Web',
  fontSize: 16,
  textColor: color.general.main,
};

const useStyles = ({ height, justifyContentByData, loading }) => {
  return makeStyles(() => ({
    chartContainer: {
      height: height,
    },
    legendContainer: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: justifyContentByData,
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
      // height: '300px',
      height: height,
      justifyContent: 'center',
    },
    root: {
      minHeight: height,
      position: 'relative',
      width: '100%',
    },
  }))();
};

export default useStyles;
