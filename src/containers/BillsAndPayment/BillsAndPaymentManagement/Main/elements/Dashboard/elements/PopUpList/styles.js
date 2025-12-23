import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      padding: '32px 40px',
      width: 1054,
    },
    tableContainer: {
      // maxHeight: '70vh',
      // overflowY: 'auto',
      // overflowX: 'hidden',
      // p: 1,
      position: 'relative',
      // marginTop: 24,
      // paddingTop: 16,
    },
  }))();
};

export default useStyles;
