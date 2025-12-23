import { makeStyles } from '@material-ui/core';

const useStyles = ({ mobileClient }) => {
  return makeStyles(() => ({
    icon: {
      height: mobileClient ? 56 : 80,
      width: mobileClient ? 56 : 80,
    },
  }))();
};

export default useStyles;
