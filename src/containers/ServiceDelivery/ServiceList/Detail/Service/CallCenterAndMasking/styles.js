import { makeStyles } from '@material-ui/core';

const useStyles = ({ isLoading }) => {
  return makeStyles(() => ({
    contentContainer: {
      visibility: isLoading ? 'hidden' : 'visible',
    },
  }))();
};

export default useStyles;
