import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  const baseIcon = {
    alignItems: 'center',
    background: color.primary.main,
    borderRadius: '50%',
    color: color.white,
    display: 'flex',
    fontWeight: 500,
    justifyContent: 'center',
  };

  const baseCard = {
    borderRadius: '1rem',
    overflow: 'visible',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  return makeStyles(() => ({
    title: {
      marginRight: '1.5rem',
      marginBottom: '0.275rem',
    },
    cardContainer: {
      padding: '1rem 5rem 3rem 5rem',
    },
    card: {
      border: '2px dashed #E4E7E9',
      padding: '1.5rem !important',
      width: '100%',
      ...baseCard,
    },
    cardPreview: {
      boxShadow: '0px 2px 9px rgb(46 67 77 / 8%)',
      padding: '1.5rem !important',
      ...baseCard,
    },
    wrapper: {
      border: '2px dashed #E4E7E9',
      borderTop: 'none',
    },
    icon: {
      marginRight: '1rem',
    },
    image: {
      height: 32,
      width: 32,
      marginRight: '1.5rem',
    },
    deleteIcon: {
      ...baseIcon,
      position: 'absolute',
      right: '1rem',
      top: '1rem',
      width: 33,
      height: 33,
      cursor: 'pointer',
      fontSize: 18,
      '&:hover': {
        background: color.primary.mid,
      },
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
  }))();
};

export default useStyles;
