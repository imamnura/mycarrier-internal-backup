import { ASSETS_URL } from '@constants/env';
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

  return makeStyles(() => ({
    cardContainer: {
      alignItems: 'stretch',
      justifyContent: 'center',
      // marginTop: 16,
      // padding: '0 32px'
    },
    card: {
      background: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: '0px 2px 9px rgb(46 67 77 / 8%)',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'space-between',
      overflow: 'visible',
      padding: '0 24px 10px',
      position: 'relative',
      height: '100%',
    },
    number: {
      ...baseIcon,
      marginTop: 16,
      border: `6px solid ${color.primary.soft}`,
      height: 45,
      width: 45,
    },
    desc: {
      fontSize: '14px !important',
    },
    deleteIcon: {
      ...baseIcon,
      position: 'absolute',
      right: '3%',
      top: '5%',
      transform: 'translate(10%, -5%)',
      width: 33,
      height: 33,
      cursor: 'pointer',
      fontSize: 18,
      '&:hover': {
        background: color.primary.mid,
      },
    },
    root: {
      borderTop: 'none',
      backgroundImage: `url(${ASSETS_URL}/ewz-mytens-pub-dev/catalogpublic/v2/metro-ethernet-benefit-bg.png)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
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
