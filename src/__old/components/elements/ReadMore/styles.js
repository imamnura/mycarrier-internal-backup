import { makeStyles } from '@material-ui/core';
const useStyles = () => {
  return makeStyles(() => ({
    readMoreButton: {
      '&:hover': {
        color: '#0000cd',
        textDecoration: 'underline',
      },
      backgroundColor: 'transparent',
      border: 0,
      color: '#3071D9',
      cursor: 'pointer',
      display: 'inline',
      fontSize: '12px',
      margin: 0,
      outline: 'none',
      padding: 0,
    },

    readMoreTextHide: {
      fontSize: 0,
      maxHeight: 0,
      opacity: 0,
      transition: 'opacity 240ms ease',
    },

    readMoreTextShow: {
      fontSize: 'inherit',
      maxHeight: '10em',
      opacity: 1,
    },
  }))();
};

export default useStyles;
