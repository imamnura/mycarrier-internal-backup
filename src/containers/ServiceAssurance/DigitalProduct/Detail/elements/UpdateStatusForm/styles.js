/* eslint-disable sort-keys */
import { makeStyles } from '@material-ui/core';
const useStyles = () => {
  return makeStyles(() => ({
    boxButton: {
      display: 'flex',
      marginTop: 10,
      width: '100%',
      justifyContent: 'center',
    },
  }))();
};

export default useStyles;
