import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    contentImageLeft: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-start',
      marginRight: '5px',
    },
    contentImageRight: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-end',
      marginRight: '5px',
    },
  }))();
};

export default useStyles;
