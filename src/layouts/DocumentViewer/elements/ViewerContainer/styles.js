import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = ({ mobileClient }) => {
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
      minHeight: 70,
      padding: 16,
      position: 'fixed',
      width: '100%',
      zIndex: 1000,
      flexDirection: mobileClient ? 'column' : 'row',
      justifyContent: mobileClient ? 'flex-start' : 'space-between',
      gap: 16,
    },
    icon: {
      '&:hover': {
        color: color.primary.main,
      },
      cursor: 'pointer',
      transition: '200ms',
      marginRight: 24,
    },
    paper: {
      background: '#E5E5E5',
    },
    title: {
      flexGrow: 1,
    },
  }))();
};

export default useStyles;
