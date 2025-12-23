import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  actionWrapper: {
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '3.6rem',
    right: '5px',
    zIndex: 9,
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow:
      '0px 0px 2px 0px rgba(0, 0, 0, 0.20),0px 2px 10px 0px rgba(0, 0, 0, 0.10)',
    width: '220px',
    maxHeight: '250px',
    overflowY: 'auto',
  },
  actionOptions: {
    '&:hover': {
      backgroundColor: '#F8F9FA',
    },
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    cursor: 'pointer',
  },
}));

export default useStyles;
