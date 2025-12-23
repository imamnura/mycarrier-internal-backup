import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
    },
    line: {
      width: 32,
      height: 2,
      background: color.general.light,
    },
    circle: {
      background: color.white,
      borderRadius: '100%',
      width: 32,
      height: 32,
      border: `1px solid ${color.general.light}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      color: color.general.light,
    },
    activeCircle: {
      background: 'red',
      color: 'white',
      border: 'none',
    },
  }))();
};

export default useStyles;
