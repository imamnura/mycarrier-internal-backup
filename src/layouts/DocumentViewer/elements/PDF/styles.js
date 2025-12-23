import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = ({ centered }) => {
  let pageStyle = {};

  if (centered) {
    pageStyle = {
      display: 'flex',
      justifyContent: 'center',
    };
  }

  return makeStyles(() => ({
    actionButton: {
      alignItems: 'center',
      display: 'flex',
    },
    actionDivider: {
      background: color.general.light,
      height: 24,
      marginLeft: 16,
      marginRight: 16,
      width: 1,
    },
    disabled: {
      color: color.general.soft,
      cursor: 'not-allowed',
    },
    downloadIcon: {
      color: color.general.main,
    },
    header: {
      alignItems: 'center',
      backgroundColor: 'white',
      boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
      display: 'flex',
      height: 70,
      padding: 16,
      position: 'fixed',
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
      width: '100%',
    },
    page: {
      marginBottom: 16,
      ...pageStyle,
    },
    paper: {
      background: '#E5E5E5',
    },
    title: {
      flexGrow: 1,
      marginLeft: 24,
    },
    wrapper: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      marginBottom: 24,
      marginTop: 70,
      paddingTop: 24,
    },
    zoom: {
      borderLeft: `1px solid ${color.general.soft}`,
      marginLeft: 16,
      paddingLeft: '16px !important',
    },
  }))();
};

export default useStyles;
