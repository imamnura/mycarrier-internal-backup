import { makeStyles } from '@material-ui/core';
import color from '../../../../styles/color';

const useStyles = ({ size }) => {
  return makeStyles(() => ({
    boxNotFound: {
      alignItems: 'center',
      background: color.white,
      display: 'flex',
      flexDirection: 'column',
      height: size * 70,
      justifyContent: 'center',
      width: '100%',
    },
    information: {
      color: color.general.main,
      marginBottom: 16,
    },
    informationLabel: {
      paddingTop: 4,
    },
    itemData: {
      border: `1px solid ${color.general.light}`,
      marginBottom: -1,
      padding: 16,
    },
    itemDataAction: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
      paddingTop: 32,
    },
    loadingBox: {
      alignItems: 'center',
      border: `1px solid ${color.general.light}`,
      boxSizing: 'border-box',
      display: 'flex',
      height: 48,
      marginBottom: -1,
      padding: 16,
    },
    notFoundIcon: {
      height: 160,
      width: 160,
    },
    pageInformation: {
      backgroundColor: color.white,
      borderTop: `1px solid ${color.general.light}`,
      bottom: 0,
      marginTop: -1,
      padding: 8,
      position: 'sticky',
      textAlign: 'right',
      width: '100%',
    },
  }))();
};

export default useStyles;
