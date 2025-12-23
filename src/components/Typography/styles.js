import { makeStyles } from '@material-ui/core';
import { colorMapper } from '../../styles/color';

const useStyles = ({ variant, weight, inline: _inline, color: _color }) => {
  const inline = _inline ? { display: 'block' } : {};

  const color = colorMapper(_color);

  const weights = {
    bold: {
      fontWeight: 'bold',
    },
    inherit: {
      fontWeight: 'inherit',
    },
    light: {
      fontWeight: 300,
    },
    medium: {
      fontWeight: 600,
    },
    normal: {
      fontWeight: 'normal',
    },
  };

  const variants = {
    body1: {
      fontSize: 16,
      letterSpacing: '0.005em',
      lineHeight: '19px',
    },
    body2: {
      fontSize: 14,
      letterSpacing: '0.0025em',
      lineHeight: '14px',
    },
    buttonL: {
      fontSize: 24,
      fontWeight: 'bold',
      letterSpacing: '0.01em',
      lineHeight: '28px',
      textTransform: 'uppercase',
    },
    buttonM: {
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: '0.01em',
      lineHeight: '18px',
      textTransform: 'uppercase',
    },
    buttonS: {
      fontSize: 12,
      fontWeight: 'bold',
      letterSpacing: '0.01em',
      lineHeight: '14px',
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: 12,
      letterSpacing: '0.004em',
      lineHeight: '14px',
    },
    h1: {
      fontSize: 60,
      letterSpacing: '-0.005em',
      lineHeight: '70px',
    },
    h2: {
      fontSize: 48,
      lineHeight: '56px',
    },
    h3: {
      fontSize: 34,
      letterSpacing: '0.0025em',
      lineHeight: '40px',
    },
    h4: {
      fontSize: 24,
      lineHeight: '28px',
    },
    h5: {
      fontSize: 20,
      letterSpacing: '0.0015em',
      lineHeight: '23px',
    },
    overline: {
      fontSize: 10,
      letterSpacing: '0.015em',
      lineHeight: '12px',
    },
    subtitle1: {
      fontSize: 16,
      letterSpacing: '0.0015em',
      lineHeight: '19px',
    },
    subtitle2: {
      fontSize: 14,
      letterSpacing: '0.01em',
      lineHeight: '16px',
    },
  };

  const base = {
    fontFamily: 'Titillium Web',
    fontStyle: 'normal',
  };

  return makeStyles(() => ({
    root: {
      ...base,
      ...weights[weight],
      ...variants[variant],
      ...inline,
      color,
    },
  }))();
};

export default useStyles;
