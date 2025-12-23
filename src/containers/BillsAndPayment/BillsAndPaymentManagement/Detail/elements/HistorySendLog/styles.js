import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    worklogItem: {
      display: 'flex',
    },
    node: {
      height: 16,
      width: 16,
      minWidth: 16,
      borderRadius: '100%',
      background: color.general.light,
      zIndex: 3,
    },
    activeNode: {
      background: color.green.main,
    },
    rejectNode: {
      background: color.primary.main,
    },
    waitingNode: {
      background: color.yellow.main,
    },
    content: {
      paddingBottom: 24,
      marginLeft: -9,
      paddingLeft: 24,
      borderLeft: `2px solid ${color.general.light}`,
      boxSizing: 'border-box',
    },
    contentCollapsed: {
      overflow: 'hidden',
      maxHeight: '25%',
      transition: 'max-height 0.2s ease-out',
    },
    contentExpanded: {
      marginTop: '8px',
      maxHeight: '100%',
      transition: 'max-height 0.3s ease-in',
    },
    activeContent: {
      borderLeft: `2px solid ${color.green.main}`,
    },
    lastContent: {
      border: 'none',
    },
    lastChild: {
      border: 'none',
      paddingBottom: 0,
    },
  }))();
};

export default useStyles;
