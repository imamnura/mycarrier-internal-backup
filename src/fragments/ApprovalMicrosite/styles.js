import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = ({ mobileClient }) => {
  return makeStyles(() => ({
    content: {
      border: `1px solid ${color.general.light}`,
      borderRadius: mobileClient ? 16 : 40,
      boxSizing: 'border-box',
      height: 'fit-content',
      margin: 20,
      maxWidth: 560,
      padding: mobileClient ? 16 : 40,
      width: '100%',
    },
    footer: {
      borderTop: `1px solid ${color.general.light}`,
      boxSizing: 'border-box',
      padding: mobileClient ? 20 : 40,
      textAlign: 'center',
    },
    header: {
      '& > img': {
        height: mobileClient ? 24 : 40,
      },
      alignItems: 'center',
      background: color.white,
      borderBottom: `1px solid ${color.general.light}`,
      boxSizing: 'border-box',
      display: 'flex',
      minHeight: mobileClient ? 56 : 120,
      justifyContent: 'center',
    },
    information: {
      border: `1px solid ${color.general.light}`,
      borderRadius: 10,
      padding: 16,
    },
    main: {
      display: 'flex',
      justifyContent: 'center',
      overflow: 'auto',
      width: '100%',
      flexGrow: 1,
      wordWrap: 'break-word',
    },
    title: {
      '& > img': {
        border: `1px solid ${color.general.light}`,
        borderRadius: 5,
        height: mobileClient ? 56 : 64,
        marginRight: 16,
        padding: 8,
      },
      borderBottom: `1px solid ${color.general.light}`,
      display: 'flex',
      paddingBottom: mobileClient ? 16 : 32,
      paddingRight: 16,
    },
    centeredContent: {
      height: 'calc(100vh - 120px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    },
  }))();
};

export default useStyles;
