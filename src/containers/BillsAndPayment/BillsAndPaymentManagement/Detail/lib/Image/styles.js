import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  const baseBtnIcon = {
    '&:hover': {
      cursor: 'pointer',
    },
    padding: '4px',
    borderRadius: '100%',
    borderColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
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
      width: '100px',
      height: '100px',
      padding: '16px 12px',
      borderRadius: '12px',
      border: '2px dashed #ADC2FF',
      backgroundColor: '#F5F7FF',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
    },
    imageContainer: {
      width: '100px',
      height: '100px',
      borderRadius: '12px',
      // backgroundColor: '#F5F7FF',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
    },
    imageRounded: {
      width: '100px',
      height: '100px',
      borderRadius: '12px',
      // backgroundColor: '#F5F7FF',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      color: '#B3C3CA',
      width: '29.999px',
      height: '29.999px',
    },
    iconContainer: {
      backgroundColor: '#F5F7FF',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '18px',
      textAlign: 'center',
    },
    container: {
      position: 'relative',
      width: '100%',
    },
    positionIconPencil: {
      ...baseBtnIcon,
      position: 'absolute',
      top: '-15px',
      right: '20px',
      color: '#F79009',
      backgroundColor: '#f79009',
      width: '27px',
      height: '27px',
      justifyContent: 'center',
    },
    positionIconX: {
      position: 'absolute',
      top: '-15px',
      right: '-10px',
    },
    btnIcon: {
      ...baseBtnIcon,
      color: '#F79009',
      backgroundColor: '#f79009',
    },
    btnIconX: {
      ...baseBtnIcon,
      color: '#de1b1b',
      backgroundColor: '#de1b1b',
    },
    iconBtn: {
      height: '1rem',
      width: '1rem',
    },
  }))();
};

export default useStyles;
