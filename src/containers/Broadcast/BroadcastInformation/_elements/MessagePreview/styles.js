import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    previemMessageImage: {
      borderRadius: 8,
      marginBottom: 8,
      width: '100%',
    },
    previewBg: {
      background: 'url(/img/whatsapp-broadcast.png)',
      backgroundSize: 'cover',
      minHeight: 616,
      paddingBottom: 16,
      marginLeft: -4,
      paddingLeft: 24,
      paddingTop: 80,
      width: 'calc(100% + 8px)',
    },
    previewMessageBox: {
      background: 'white',
      borderRadius: 10,
      borderTopLeftRadius: 0,
      padding: 10,
      position: 'relative',
      width: '80%',
    },
    previewMessageTime: {
      textAlign: 'right',
    },
    previewMessageTriangle: {
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderTop: '10px solid white',
      height: 0,
      left: -8,
      position: 'absolute',
      top: 0,
      width: 0,
      zIndex: 1,
    },
    pdfShow: {
      background: color.general.light,
      padding: 8,
      borderRadius: 8,
      marginBottom: 8,
    },
  }))();
};

export default useStyles;
