import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    inputField: {
      marginBottom: '24px',
    },
    marginBT: {
      marginBottom: '24px',
      marginTop: '24px',
    },
    required: {
      marginRight: 2,
    },
    subtitle: {
      display: 'flex',
      flexFlow: 'column',
      margin: '24px 0',
    },
  }))();
};

export default useStyles;
