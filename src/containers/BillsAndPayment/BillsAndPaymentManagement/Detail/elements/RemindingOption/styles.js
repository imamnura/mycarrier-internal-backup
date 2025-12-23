import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      padding: '32px 40px',
    },
  }))();
};

export default useStyles;
