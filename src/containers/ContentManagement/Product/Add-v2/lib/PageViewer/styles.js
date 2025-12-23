import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    closeIcon: {
      color: color.general.main,
      fontSize: 20,
    },
    grow: {
      flexGrow: 1,
    },
    header: {
      backgroundColor: 'white',
      boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
      height: 70,
      position: 'fixed',
      width: '100%',
      zIndex: 1000,
    },
    helper: {
      bottom: 16,
      display: 'flex',
      height: 56,
      justifyContent: 'center',
      position: 'fixed',
      width: '100%',
    },
    helperContent: {
      alignItems: 'center',
      backgroundColor: 'white',
      boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
      display: 'flex',
      padding: '0px 16px',
    },
    icon: {
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        cursor: 'pointer',
      },
      alignItems: 'center',
      borderRadius: '100%',
      display: 'flex',
      height: 40,
      justifyContent: 'center',
      transitionDuration: '200ms',
      width: 40,
    },
    mainAppBar: {
      alignItems: 'center',
      boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
      display: 'flex',
      flexDirection: 'row',
      height: 70,
    },
    mainHeader: {
      width: '100%',
    },
    page: {
      marginBottom: 16,
    },
    pageCount: {
      display: 'flex',
      justifyContent: 'space-between',
      width: 100,
    },
    pagesWrapper: {
      // margin: 'auto',
      marginTop: 64,
      // padding: '0px 16px'
    },
    root: {
      backgroundColor: color.white,
    },
    nav: {
      '& > nav': {
        top: 64,
      },
    },
    block: {
      width: '100%',
      height: 64,
      content: 'test',
      position: 'fixed',
      top: 64,
      left: 0,
      // backgroundColor: 'red',
      zIndex: 101,
    },
  }))();
};

export default useStyles;
