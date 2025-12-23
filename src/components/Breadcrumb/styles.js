import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = ({ size }) => {
  const separatorSize = {
    large: 24,
    medium: 16,
    small: 12,
  }[size];

  return makeStyles((theme) => ({
    flex: {
      ...theme.flex,
      minHeight: separatorSize,
    },
    separator: {
      color: color.general.mid,
      height: separatorSize,
      margin: '0px 8px',
      width: separatorSize,
    },
    url: {
      '&:hover': {
        color: color.general.light,
      },
      cursor: 'pointer',
    },
  }))();
};

export default useStyles;
