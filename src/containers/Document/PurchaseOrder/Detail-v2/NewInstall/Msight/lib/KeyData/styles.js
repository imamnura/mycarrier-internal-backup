import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  actionWrapper: {
    alignItems: 'center',
    display: 'flex',
  },
  actionButton: {
    marginLeft: '1.5rem',
  },
  button: {
    cursor: 'pointer',
  },
  label: {
    textTransform: 'uppercase',
  },
  rootMargin: {
    margin: '8px 0px',
  },
}));

export default useStyles;
