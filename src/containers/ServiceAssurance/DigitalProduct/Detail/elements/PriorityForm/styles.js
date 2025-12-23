import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      overflow: 'visible',
    },
  }))();
};

export default useStyles;
