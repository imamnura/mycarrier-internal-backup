import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
      marginTop: 94,
      marginBottom: 24,
      marginLeft: 24,
      marginRight: 24,
      overflow: 'auto',
    },
    centered: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }))();
};

export default useStyles;
