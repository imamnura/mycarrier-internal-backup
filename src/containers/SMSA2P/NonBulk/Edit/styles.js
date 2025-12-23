import { makeStyles } from '@material-ui/core';

const useStyles = () => {
  return makeStyles(() => ({
    media: {
      marginBottom: '1rem',
    },
    wrapper: {
      paddingTop: 32,
    },
    wrapperMedia: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      borderRadius: '0.5rem',
      borderTopLeftRadius: '0px',
      padding: '0.5rem',
      position: 'absolute',
    },
    wrapperPreview: {
      display: 'flex',
      justifyContent: 'center',
      margin: '0 3.5rem',
      position: 'relative',
    },
    wrapperSender: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      marginLeft: '0.5rem',
      position: 'absolute',
    },
  }))();
};

export default useStyles;
