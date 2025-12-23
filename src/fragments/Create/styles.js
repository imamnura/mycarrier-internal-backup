import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    contentContainer: {
      marginTop: 40,
    },
    headerContainer: {
      // background: 'white',
      // position: 'sticky',
      // top: 146,
      zIndex: 3,
    },
  }))();
};

export default useStyles;
