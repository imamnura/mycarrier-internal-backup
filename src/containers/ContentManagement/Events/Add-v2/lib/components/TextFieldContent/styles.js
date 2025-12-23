import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = (
  position,
  fontSIze,
  weight,
  colorPlaceholder,
  noSpacing,
  colorInput,
) => {
  const weights = {
    bold: {
      fontWeight: 700,
    },
    light: {
      fontWeight: 300,
    },
    medium: {
      fontWeight: 500,
    },
    normal: {
      fontWeight: 'normal',
    },
  };

  const colorPlaceholders = {
    black: {
      color: color.general.mid,
    },
    white: {
      color: color.general.soft,
    },
  };

  return makeStyles(() => ({
    input: {
      '& div': {
        '&:before': {
          border: 'none',
          borderBottomStyle: 'none !important',
        },
        '& input': {
          '&::placeholder': {
            ...colorPlaceholders[colorPlaceholder],
          },
          color: colorInput ? colorInput : color.general.main,
          fontSize: fontSIze,
          textAlign: position,
          ...weights[weight],
        },
        '& textarea': {
          '&::placeholder': {
            ...colorPlaceholders[colorPlaceholder],
          },
          color: colorInput ? colorInput : color.general.main,
          fontSize: fontSIze,
          textAlign: position,
          ...weights[weight],
        },
        marginTop: noSpacing ? '0 !important' : '12px !important',
        padding: noSpacing ? '0 !important' : '6px 0 7px !important',
      },
    },
  }))();
};

export default useStyles;
