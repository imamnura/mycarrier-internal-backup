import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

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
    content: {
      paddingBottom: 24,
      marginLeft: -9,
      paddingLeft: 24,
      borderLeft: `2px solid ${color.general.light}`,
      boxSizing: 'border-box',
    },
    lastContent: {
      border: 'none',
    },
    lastChild: {
      border: 'none',
      paddingBottom: 0,
    },
    dot: {
      height: '6px',
      width: '6px',
      backgroundColor: '#bbb',
      borderRadius: '50%',
      display: 'inherit',
      margin: '0 8px',
    },
  }))();
};

export default useStyles;
