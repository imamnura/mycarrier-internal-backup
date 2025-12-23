import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    arrowBottom: {
      '&:after': {
        borderBottom: 'none',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderTop: `10px solid ${color.general.soft}`,
        bottom: -10,
        content: '""',
        left: 26,
        position: 'absolute',
      },
      '&:hover': {
        color: color.general.mid,
      },
      alignItems: 'center',
      backgroundColor: color.general.soft,
      borderRadius: 4,
      cursor: 'pointer',
      display: 'flex',
      float: 'left',
      height: 35,
      justifyContent: 'space-between',
      marginBottom: 18,
      minWidth: 209,
      maxWidth: 300,
      padding: 8,
      position: 'relative',
      width: '100%',
    },
    arrowTop: {
      '&:after': {
        borderBottom: `10px solid ${color.general.soft}`,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderTop: 'none',
        content: '""',
        position: 'absolute',
        right: 24,
        top: -10,
      },
      '&:hover': {
        color: color.general.mid,
      },
      alignItems: 'center',
      backgroundColor: color.general.soft,
      borderRadius: 4,
      cursor: 'pointer',
      display: 'flex',
      float: 'left',
      height: 35,
      justifyContent: 'space-between',
      marginTop: 18,
      minWidth: 209,
      maxWidth: 300,
      padding: 8,
      position: 'relative',
      width: '100%',
    },
    copyIcon: {
      height: 16,
      width: 16,
    },
    hidden: {
      visibility: 'hidden',
    },
    info: {
      fontStyle: 'italic !important',
      margin: '8px 0px',
      minHeight: 12,
    },
    line: {
      backgroundColor: color.general.soft,
      height: 4,
    },
    lineContainer: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '100%',
    },
    node: {
      background: color.general.main,
      border: `4px solid ${color.general.soft}`,
      borderRadius: 24,
      boxSizing: 'border-box',
      height: 24,
      margin: '0px 24px',
      minWidth: 24,
      width: 24,
    },
    nodeContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      overflow: 'auto',
      position: 'relative',
      zIndex: 2,
    },
    nodeContentBottom: {
      display: 'flex',
      flexDirection: 'column-reverse',
      width: '100%',
      maxWidth: 300,
    },
    nodeContentTop: {
      display: 'flex',
      flexDirection: 'column',
    },
    nodeItem: {
      display: 'flex',
      flexDirection: 'column',
      width: 300,
    },
    nodeItemBottom: {
      alignItems: 'flex-end',
      display: 'flex',
      flexDirection: 'column',
      marginTop: -24,
      width: '100%',
    },
    root: {
      position: 'relative',
      width: 'min-content',
      maxWidth: '100%',
    },
    visible: {
      visibility: 'visible',
    },
  }))();
};

export default useStyles;
