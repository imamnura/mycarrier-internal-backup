import { makeStyles } from '@material-ui/core';

const useStyles = ({ mobileClient, size: _size, maxWidth }) => {
  let size = 120;

  if (mobileClient || _size === 'small') {
    size = 80;
  }

  return makeStyles(() => ({
    ilustration: {
      height: `${size}px !important`,
      marginBottom: 16,
      width: `${size}px !important`,
    },
    root: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      maxWidth: maxWidth,
      textAlign: 'center',
    },
  }))();
};

export default useStyles;
