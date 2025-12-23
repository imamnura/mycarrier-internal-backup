import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    wrapper: {
      display: 'flex',
      height: '100%',
      marginTop: 94,
      marginLeft: 24,
      marginRight: 24,
      overflow: 'auto',
      borderTop: `1px solid ${color.general.light}`,
    },
    table: {
      '& > thead': {
        position: 'sticky',
        top: -1,
      },
      '& > thead > tr > td': {
        borderTop: 'none',
        background: color.general.soft,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
      },
      '& tr > td': {
        border: `1px solid ${color.general.light}`,
        padding: '8px 16px',
        height: 20,
        overflow: 'hidden',
        verticalAlign: 'top',
      },
      borderCollapse: 'collapse',
      background: color.white,
      tableLayout: 'fixed',
      minWidth: '100%',
    },
    loading: {
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }))();
};

export default useStyles;
