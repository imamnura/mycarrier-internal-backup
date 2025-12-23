import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = (previewMode) => {
  return makeStyles(() => ({
    card: {
      background: '#FFFFFF',
      borderRadius: '20px',
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      textAlign: 'center',
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    cardContainer: {
      alignItems: 'stretch',
      justifyContent: 'center',
      marginTop: 16,
    },
    cardImage: {
      height: '176px',
    },
    content: {
      padding: previewMode ? '5rem 1rem' : '6rem 4rem',
      marginInline: 'auto',
      maxWidth: '1280px',
      width: '100%',
    },
    emptyCard: {
      backgroundColor: color.general.soft,
      boxShadow: 'none !important',
      height: '360px !important',
    },
    emptyImage: {
      alignItems: 'end',
      display: 'flex',
      height: '176px',
      justifyContent: 'center',
      width: '100%',
    },
    editableTitle: {
      // cursor: 'pointer',
      fontSize: 24,
      fontWeight: '400',
      lineHeight: '28px',
      textAlign: 'center',
    },
    editableTitleActive: {
      backgroundColor: '#FFF3BF',
      fontSize: 24,
      fontWeight: '400',
      lineHeight: '28px',
      margin: '0.83em 0',
      textAlign: 'center',
    },
    icon: {
      color: '#B3C3CA',
      height: 67,
      width: 67,
    },
    root: {
      border: previewMode ? 'none' : '2px dashed #E4E7E9',
      borderTop: 'none',
      position: 'relative',
    },
    w100: {
      width: '100%',
    },
    pb0: {
      paddingBottom: '0 !important',
    },
  }))();
};

export default useStyles;
