import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    container: {
      border: `1px solid ${color.general.light}`,
      borderRadius: 16,
      padding: 24,
      background: '#fff',
    },
    title: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
    },
    filter: {
      marginTop: 16,
      marginBottom: 8,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    maximize: {
      color: color.general.main,
      margin: -12,
    },
    graph: {
      marginBottom: 14,
      marginTop: 16,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
    },
  }))();
};

export const pieTheme = {
  axis: {
    label: {
      text: {
        fontSize: 10,
      },
    },
  },
  fontFamily: 'Titillium Web',
  fontSize: 12,
  textColor: color.general.main,
};

export default useStyles;
