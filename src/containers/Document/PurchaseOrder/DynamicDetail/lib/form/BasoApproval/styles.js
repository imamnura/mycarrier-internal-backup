import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = ({ step }) => {
  return makeStyles(() => ({
    paper: {
      background: '#f8f9fa',
      overflowY: 'hidden',
      position: 'relative',
    },
    page: {
      marginBottom: 16,
    },
    wrapper: {
      display: 'flex',
      height: '100%',
      width: '100%',
      marginBottom: 24,
      position: 'relative',
    },
    wrapperScroll: {
      width: '100%',
      overflowY: 'auto',
    },
    wrapperDocument: {
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      paddingTop: 24,
    },
    sign: {
      position: 'absolute',
      border: step == 1 ? '1px solid #3366FF' : '',
      padding: 5,
      backgroundColor: step == 1 ? '#3366FF1A' : '',
      cursor: step == 1 ? 'move' : '',
      whiteSpace: 'nowrap',
    },
    placeholderSign: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontWeight: 700,
      fontSize: '14px',
      color: '#3366FF',
      lineHeight: '21px',
    },
    trash: {
      position: 'absolute',
      right: '-30px',
      top: '-30px',
      width: '32px',
      height: '32px',
      backgroundColor: '#FFFFFF',
      color: '#DE1B1B',
      padding: 8,
      borderRadius: '100%',
      // boxShadow: ' 0px 0px 3px 0px rgba(0, 0, 0, 0.1)',
      boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.15)',
      cursor: 'pointer',
    },
    resize: {
      position: 'absolute',
      width: '10px',
      height: '10px',
      backgroundColor: '#FFFFFF',
      border: '1px solid #11181B',
      borderRadius: '100%',
    },
    zoom: {
      borderLeft: `1px solid ${color.general.soft}`,
      marginLeft: 16,
      paddingLeft: '16px !important',
    },
    navigation: {
      alignItems: 'center',
      backgroundColor: 'white',
      boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
      display: 'flex',
      padding: '0px 16px',
    },
    navigationWrapper: {
      bottom: 16,
      display: 'flex',
      height: 56,
      justifyContent: 'center',
      position: 'fixed',
      width: '40%',
    },
    icon: {
      '&:hover': {
        color: color.primary.main,
      },
      cursor: 'pointer',
      transition: '200ms',
    },
    wrapperSidebar: {
      background: 'white',
      // width: '451px',
      width: '550px',
      height: '100%',
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      overflowY: 'hidden',
    },
  }))();
};

export default useStyles;
