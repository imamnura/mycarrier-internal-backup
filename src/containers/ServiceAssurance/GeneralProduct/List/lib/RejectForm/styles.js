import { makeStyles } from '@material-ui/core';
const useStyles = () => {
  return makeStyles(() => ({
    boxButton: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 10,
      width: '100%',
    },
  }))();
};

export default useStyles;
