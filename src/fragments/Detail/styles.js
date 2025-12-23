import { makeStyles } from '@material-ui/core';

const useStyles = ({ loading }) => {
  return makeStyles(() => ({
    contentContainer: {
      position: 'relative',
      visibility: loading ? 'hidden' : 'visible',
    },
    rightPanel: {
      position: 'absolute',
      height: '100%',
      width: '50%',
      top: '50%',
      left: '0%',
      background: 'fff',
      boxShadow: '0px 4px 10px 0px #2E434D14',
    },
  }))();
};

export default useStyles;
