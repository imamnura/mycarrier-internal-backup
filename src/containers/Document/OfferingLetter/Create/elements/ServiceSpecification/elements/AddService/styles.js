import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      width: 432,
      maxWidth: 'calc(100% - 80px)',
      padding: '32px 40px',
    },
  }))();
};

export default useStyles;
