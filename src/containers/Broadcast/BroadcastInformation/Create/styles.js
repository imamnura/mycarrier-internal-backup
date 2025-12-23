import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    dateTimeWrapper: {
      maxWidth: 235,
    },
    previewWrapper: {
      maxWidth: '100%',
      width: 360,
    },
    spaceBottom: {
      marginBottom: 16,
    },
    spaceTopBottom: {
      marginBottom: 16,
      marginTop: 16,
    },
  }))();
};

export default useStyles;
