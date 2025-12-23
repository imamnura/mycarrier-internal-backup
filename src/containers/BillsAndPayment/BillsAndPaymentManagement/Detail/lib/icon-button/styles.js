import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    button: {
      '&:hover': {
        backgroundColor: '#e5e8ea',
      },
      display: 'flex',
      padding: '0.25rem',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '0.25rem',
    },
  }))();
};

export default useStyles;
