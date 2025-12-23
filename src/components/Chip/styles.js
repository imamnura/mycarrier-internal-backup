import { makeStyles } from '@material-ui/core';
import { colorMapper } from '../../styles/color';

const useStyles = ({ background: _bg, color: _color, colorIcon, weight }) => {
  const color = colorMapper(_color);
  const background = colorMapper(_bg);

  const weights = {
    bold: {
      fontWeight: 'bold',
    },
    light: {
      fontWeight: 300,
    },
    medium: {
      fontWeight: 700,
    },
    normal: {
      fontWeight: 'normal',
    },
  };

  const colorIcons = {
    default: {
      color: 'rgba(0, 0, 0, 0.26)',
    },
    red: {
      color: '#DE1B1B',
    },
    white: {
      color: '#FFFFFF',
    },
  };

  return makeStyles(() => ({
    root: {
      '& .MuiChip-label': {
        ...weights[weight],
      },
      '& .MuiChip-deleteIcon': {
        ...colorIcons[colorIcon],
      },
      marginRight: '0.5rem',
      marginBottom: '0.5rem',
      color,
      background,
    },
  }))();
};

export default useStyles;
