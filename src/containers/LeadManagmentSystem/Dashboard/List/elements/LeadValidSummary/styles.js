import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    '@keyframes sectionIn': {
      '0%': {
        opacity: 0,
        transform: 'translateX(-50%)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateX(0)',
      },
    },
    '@keyframes sectionOut': {
      '0%': {
        opacity: 0,
        transform: 'translateX(50%)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateX(0)',
      },
    },
    container: {
      border: `1px solid ${color.general.light}`,
      borderRadius: 16,
      padding: 24,
      background: '#fff',
    },
    dots: {
      backgroundColor: '#D2DADE',
      borderRadius: '16px',
      cursor: 'pointer',
      height: '14px',
      marginLeft: '12px',
      width: '14px',
    },
    dotsActive: {
      backgroundColor: '#DE1B1B',
      borderRadius: '16px',
      height: '14px',
      marginLeft: '12px',
      width: '14px',
    },
    dotsContainer: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
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
      marginTop: 16,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      animation: `$sectionIn 1000ms`,
      transitionTimingFunction: 'ease-in-out',
    },
    revenue: {
      marginBottom: 54,
      marginTop: 65,
      animation: `$sectionOut 1000ms`,
      transitionTimingFunction: 'ease-in-out',
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
