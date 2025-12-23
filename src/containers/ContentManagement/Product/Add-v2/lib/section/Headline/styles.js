import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = (previewMode) => {
  return makeStyles(() => ({
    borderSection: {
      border: `2px dashed ${color.general.soft}`,
      borderTop: `none`,
    },
    content: {
      alignItems: 'center',
      padding: previewMode ? '5rem 1rem' : '5rem 4rem',
      marginInline: 'auto',
      maxWidth: '1280px',
      width: '100%',
    },
    mTitle: {
      marginBottom: '10px',
    },
    mDesc: {
      marginBottom: '10px',
      marginLeft: '4rem',
    },
    root: {
      backgroundColor: '#FAFAFA',
      position: 'relative',
    },
  }))();
};

export default useStyles;
