import { makeStyles } from '@material-ui/core';

const useStyles = (previewMode) => {
  return makeStyles((theme) => ({
    container: {
      alignItems: 'center',
      display: 'flex',
      marginLeft: 0,
      padding: '2rem 0',
      position: 'relative',
      textAlign: 'center',
      minHeight: '440px',
      justifyContent: 'center',
    },
    clipBackground: {
      background:
        'linear-gradient(90deg, rgba(251, 251, 251, 0.95) 25.02%, rgba(255, 255, 255, 0.85) 76.04%, rgba(255, 255, 255, 0.03) 108.04%)',
      clipPath: 'polygon(0 0, 100% 0, 87% 100%, 0% 100%)',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '50%',
    },
    contentImage: {
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
    },
    leftContainer: {
      alignItems: 'initial',
      display: 'flex',
      flexDirection: 'column',
      margin: '20px 0',
      maxWidth: '1280px',
      padding: previewMode ? '0 1rem' : '0 4rem',
      paddingLeft: previewMode ? '1rem' : '4rem',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },
    leftSection: {
      [theme.breakpoints.up('md')]: {
        width: 'calc((50% - 16px) - 128px)',
      },
      [theme.breakpoints.down('md')]: {
        width: 'calc(50% - 16px)',
      },
      zIndex: '1',
    },
    mbField: {
      marginBottom: '10px',
    },
    root: {
      border: previewMode ? 'none' : '2px dashed #E4E7E9',
      position: 'relative',
    },
  }))();
};

export default useStyles;
