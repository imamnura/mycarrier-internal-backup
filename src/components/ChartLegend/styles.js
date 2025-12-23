import { makeStyles } from '@material-ui/core';

const useStyles = ({ color, variant }) => {
  return makeStyles(() => ({
    box: {
      background: color,
      borderRadius: 2,
      height: variant === 'line' ? 2 : 16,
      marginRight: 8,
      minHeight: variant === 'line' ? 2 : 16,
      minWidth: 16,
      width: 16,
    },
    root: {
      alignItems: 'center',
      display: 'flex',
    },
  }))();
};

export default useStyles;
