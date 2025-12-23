import { makeStyles } from '@material-ui/core';

const useStyles = ({ optionActivity }) => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      width: 432,
      overflow: optionActivity.length > 0 ? 'hidden' : 'visible',
    },
  }))();
};

export default useStyles;
