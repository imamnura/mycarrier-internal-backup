import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    chip: {
      marginBottom: '10px',
      marginLeft: '5px',
    },
    subtitle: {
      marginBottom: '24px',
    },
    wrapper: {
      marginBottom: '13px',
      marginTop: '24px',
    },
  }))();
};

export default useStyles;
