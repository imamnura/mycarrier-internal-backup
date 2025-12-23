import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = (previewMode) => {
  return makeStyles(() => ({
    root: {
      border: previewMode ? 'none' : `2px dashed ${color.general.soft}`,
      marginTop: '2.5rem',
      padding: '4rem 0 2.5rem',
      position: 'relative',
    },
    card: {
      backgroundColor: color.blue.soft,
      borderRadius: '5px',
      marginRight: '15px',
      padding: '0.3rem 0.7rem',
    },
    cardLocation: {
      backgroundColor: '#F5F5F5',
      borderRadius: '5px',
      marginRight: '10px',
      padding: '5px 0px 0px 10px',
    },
    disabledSection: {
      backgroundColor: color.white,
      height: '100%',
      left: '0',
      opacity: '0.8',
      position: 'absolute',
      top: '0',
      width: '100%',
      zIndex: '1',
    },
    wrapper: {
      alignItems: 'center',
      display: 'flex',
      marginBottom: '10px',
    },
  }))();
};

export default useStyles;
