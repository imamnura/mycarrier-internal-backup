import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      padding: '32px 40px',
      width: 634,
    },
    tableContainer: {
      position: 'relative',
      marginTop: 24,
      paddingTop: 16,
    },
    deleteIcon: {
      color: color.primary.main,
    },
    failedContainer: {
      padding: 16,
      border: '1px solid #F79009',
      background: '#FFFBF6',
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 24,
    },
  }))();
};

export default useStyles;
