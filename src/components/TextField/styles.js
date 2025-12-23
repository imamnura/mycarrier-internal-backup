import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = ({ disabled, error }) => {
  let colorVariant = color.general.main;

  if (disabled) {
    colorVariant = color.general.light;
  }

  if (error) {
    colorVariant = color.primary.main;
  }

  return makeStyles(() => ({
    adornmentIcon: {
      color: color.general.main,
      height: 16,
      width: 16,
    },
    adornmentText: {
      marginBottom: 4,
    },
    helper: {
      color: colorVariant,
      display: 'flex',
      justifyContent: 'space-between',
      minHeight: 18,
      paddingTop: 4,
      textAlign: 'left',
      width: '100%',
      gap: 8,
    },
    helperError: {
      color: color.primary.main,
    },
    input: {
      '&::placeholder': {
        color: color.general.light,
        opacity: 1,
      },
      fontSize: 14,
      height: 24,
      lineHeight: 1.5,
      padding: 0,
      paddingBottom: 4,
      // WebkitBoxShadow: '0 0 0 30px white inset !important'
    },
    inputDisabled: {
      color: color.general.light,
    },
    inputRoot: {
      '&:not(.Mui-disabled):hover::before': {
        borderBottom: `1px solid ${color.general.mid}`,
      },
      marginTop: '12px !important',
    },
    label: {
      color: color.general.mid,
      // cursor: 'text',
      fontSize: 14,
      lineHeight: 0,
      // zIndex: 1
    },
    labelAsterisk: {
      color: color.primary.main,
      marginRight: 2,
    },
    labelDisabled: {
      color: `${color.general.light} !important`,
    },
    labelFocused: {
      color: `${color.general.main} !important`,
    },
    // eslint-disable-next-line sort-keys
    labelError: {
      color: `${color.primary.main} !important`,
    },
    labelShrink: {
      fontWeight: 500,
      transform: 'translate(0, 5px) scale(0.715)',
    },
    root: {},
    showHidePassword: {
      '&:hover': {
        color: color.general.mid,
      },
      color: color.general.main,
      cursor: 'pointer',
      height: 16,
      width: 16,
    },
    underline: {
      '&:after': {
        borderBottom: `1px solid ${color.general.main}`,
      },
      '&:before': {
        borderBottom: `1px solid ${colorVariant}`,
        borderBottomStyle: 'solid !important',
      },
    },
    multiline: {
      padding: 0,
      paddingTop: 4,
    },
  }))();
};

export default useStyles;
