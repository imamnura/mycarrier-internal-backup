import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = (previewMode) => {
  return makeStyles(() => ({
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
    fieldContainer: {
      border: `1px dashed ${color.general.soft}`,
      padding: '1rem 1rem 1.5rem',
      position: 'relative',
    },
    addButton: {
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translate(-50%, 50%)',
    },
  }))();
};

export default useStyles;
