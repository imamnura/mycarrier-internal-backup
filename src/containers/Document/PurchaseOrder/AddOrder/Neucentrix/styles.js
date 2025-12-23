import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    stepper: {
      maxWidth: 700,
      marginTop: 20,
      marginBottom: 20,
      margin: 'auto',
    },
  }))();
};

export default useStyles;
