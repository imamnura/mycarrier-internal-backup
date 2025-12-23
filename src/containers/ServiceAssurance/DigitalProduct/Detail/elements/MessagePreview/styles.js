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
      background: color.general.soft,
      borderRadius: 10,
      height: 'auto',
      maxHeight: '70vh',
      marginLeft: -4,
      minWidth: '100%',
      maxWidth: '671px',
      overflowY: 'auto',
      padding: 24,
      '&::-webkit-scrollbar': {
        width: 8,
      },
      '&::-webkit-scrollbar-thumb': {
        background: color.general.light,
        boxShadow: `inset 0 0 13px 13px ${color.general.light}`,
      },
      '&::-webkit-scrollbar-track': {
        border: 'none',
      },
    },
    previewMessageBox: {
      borderRadius: 10,
      margin: 10,
      padding: 10,
      position: 'relative',
      width: '60%',
    },
    previewMessageBoxStaff: {
      background: 'white',
      borderTopRightRadius: 0,
    },
    previewMessageBoxUser: {
      borderTopLeftRadius: 0,
      background: color.general.general,
      color: 'white',
    },
    previewMessageTime: {
      textAlign: 'right',
    },
    previewMessageTriangle: {
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      height: 0,
      position: 'absolute',
      top: 0,
      width: 0,
      zIndex: 1,
    },
    previewMessageTriangleStaff: {
      borderTop: '10px solid white',
      right: -8,
    },
    previewMessageTriangleUser: {
      borderTop: `10px solid ${color.general.general}`,
      left: -8,
    },
    pdfShow: {
      background: color.general.light,
      padding: 8,
      borderRadius: 8,
      marginBottom: 8,
    },
    profileIlustration: {
      height: '32px !important',
      marginRight: 10,
      width: '32px !important',
    },
    profileBox: {
      alignItems: 'flex-start',
      display: 'flex',
      justifyContent: 'space-between',
    },
    fileContainer: {
      '&:hover': {
        color: color.general.main,
      },
    },
  }))();
};

export default useStyles;
