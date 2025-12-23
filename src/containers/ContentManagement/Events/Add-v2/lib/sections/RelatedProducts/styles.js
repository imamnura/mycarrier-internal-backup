import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = (previewMode, emptyField) => {
  return makeStyles(() => ({
    root: {
      border: previewMode ? 'none' : `2px dashed ${color.general.soft}`,
      marginTop: '2.5rem',
      padding: '4rem 0 2.5rem',
      position: 'relative',
    },
    itemContainer: {
      alignItems: 'center',
      border: `1px solid ${color.general.soft}`,
      borderRadius: '0.5rem',
      display: 'flex',
      padding: '1rem',
    },
    itemsLabel: {
      marginRight: '1rem',
    },
    deleteIcon: {
      '&:hover': {
        background: color.primary.mid,
      },
      background: color.primary.main,
      borderRadius: '50%',
      color: color.white,
      cursor: 'pointer',
      height: '1.7rem',
      padding: '0.2rem',
      width: '1.7rem',
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
    selectBox: {
      position: 'relative',
      marginBottom: emptyField ? '4.5rem' : '5.4rem',
    },
    selectContainer: {
      position: 'absolute',
      width: '100%',
      zIndex: 3,
    },
    customError: {
      marginBottom: '1rem',
    },
  }))();
};

export default useStyles;
