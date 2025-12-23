import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    bar: {
      height: '100%',
      width: '100%',
      borderRadius: 16,
      position: 'absolute',
      top: 0,
      left: 0,
    },
    root: {
      position: 'relative',
      width: '100%',
      height: 8,
    },
  }))();
};

export default useStyles;
