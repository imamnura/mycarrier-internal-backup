import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    tableText: {
      textOverflow: 'ellipsis',
      textTransform: 'capitalize',
      whiteSpace: 'nowrap',
    },
  }))();
};

export default useStyles;
