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
    cardsContainer: {
      alignItems: 'stretch',
    },
    card: {
      background: color.white,
      border: `1px solid ${color.general.soft}`,
      borderRadius: '0.5rem',
      boxShadow: 'none',
      boxSizing: 'border-box',
      display: 'flex',
      height: '100%',
      justifyContent: 'space-between',
      overflow: 'visible',
      position: 'relative',
    },
    cardGrid: {
      width: '100%',
      maxWidth: '204px',
    },
    cardList: {
      display: 'flex',
      alignItems: 'center',
    },
    dashedBorder: {
      border: `1px dashed ${color.general.soft}`,
    },
    cardContent: {
      padding: 0,
      textAlign: 'center',
      width: '100%',
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
      position: 'absolute',
      top: '0.5rem',
      right: '0.5rem',
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
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      height: '120px',
      width: '100%',
    },
    addCardContainer: {
      position: 'relative',
    },
    addCardButton: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translate(-50%, 50%)',
      width: '80%',
    },
  }))();
};

export default useStyles;
