import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    actionButton: {
      alignItems: 'center',
      display: 'flex',
    },
    filterPadding: {
      flexDirection: 'row-reverse',
      margin: '8px 0px',
    },
  }))();
};

export default useStyles;
