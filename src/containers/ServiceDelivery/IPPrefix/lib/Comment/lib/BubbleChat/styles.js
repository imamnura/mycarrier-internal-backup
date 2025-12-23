import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = (mode) => {
  const card = {
    dark: {
      background: color.general.general,
      borderRadius: '0 8px 8px 8px',
    },
    light: {
      background: color.white,
      borderRadius: '8px 0 8px 8px',
    },
  };

  const textPrimary = {
    dark: {
      color: `${color.white} !important`,
    },
    light: {
      color: `${color.general.general} !important`,
    },
  };

  const textSecondary = {
    dark: {
      color: `${color.general.light} !important`,
    },
    light: {
      color: `${color.general.mid} !important`,
    },
  };

  const wrapper = {
    dark: {
      justifyContent: 'flex-start',
    },
    light: {
      justifyContent: 'flex-end',
    },
  };

  return makeStyles(() => ({
    card: {
      ...card[mode],
      boxShadow: '0px 6px 9px 0px rgba(46, 67, 77, 0.08)',
      padding: '12px',
      marginTop: '20px',
      width: '383px',
    },
    profileIllustration: {
      height: '28px',
      width: '28px',
    },
    textPrimary: textPrimary[mode],
    textSecondary: textSecondary[mode],
    wrapper: wrapper[mode],
  }))();
};

export default useStyles;
