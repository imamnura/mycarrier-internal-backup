import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = (preview, type) => {
  const imageTypes = {
    background: {
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '100%',
      width: '100%',
    },
    banner: {
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '100%',
      width: '100%',
    },
    large: {
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      borderRadius: '1rem',
      height: '18.75rem',
      // height: '320px',
      width: '100%',
      position: 'relative',
      ...(!preview && { border: '2px dashed #B3C3CA' }),
    },
    small: {
      position: 'relative',
      width: '2.25rem',
      height: '2.25rem',
    },
    icon: {
      width: '4rem',
      height: '4rem',
      borderRadius: '1px',
    },
    stretch: {
      width: '100%',
      height: '100%',
      borderRadius: '0.5rem',
    },
  };

  const iconTypes = {
    background: {
      display: 'block',
      width: '10rem',
      height: '10rem',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      opacity: 0.5,
    },
    banner: {
      display: 'block',
      width: '10rem',
      height: '10rem',
      position: 'absolute',
      left: '70%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      opacity: 0.5,
    },
    large: {
      display: 'block',
      width: '4.25rem',
      height: '4.25rem',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
    },
    small: {
      width: '2.25rem',
      height: '2.25rem',
    },
    icon: {
      width: '4rem',
      height: '4rem',
    },
    stretch: {
      width: '4rem',
      height: '4rem',
    },
  };

  const iconContainerTypes = {
    stretch: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  };

  const wordingTypes = {
    background: {
      position: 'absolute',
      top: '75%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return makeStyles(() => ({
    addCircle: {
      width: '1.4rem',
      height: '1.4rem',
      color: color.green.main,
      position: 'absolute',
      right: '1%',
      bottom: '1%',
    },
    image: {
      ...imageTypes[type],
    },
    icon: {
      color: '#B3C3CA',
      ...iconTypes[type],
    },
    iconContainer: {
      ...iconContainerTypes[type],
    },
    block: {
      display: 'block',
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    wordingImage: {
      ...wordingTypes[type],
      margin: 0,
      width: '100%',
      maxWidth: '400px',
    },
  }))();
};

export default useStyles;
