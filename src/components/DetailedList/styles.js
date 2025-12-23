import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    cell: {
      paddingBottom: 32,
      paddingTop: 16,
    },
    cellPadding: {
      paddingLeft: 24,
    },
    label: {
      marginBottom: 8,
    },
    root: {
      width: 'max-content',
      minWidth: '100%',
      borderCollapse: 'collapse',
    },
    row: {
      verticalAlign: 'top',
    },
    item: {
      width: '100%',
      border: `1px solid ${color.general.light}`,
      boxSizing: 'border-box',
      padding: 24,
      marginTop: -1,
    },
    divider: {
      borderBottom: `1px solid ${color.general.light}`,
    },
  }))();
};

export default useStyles;
