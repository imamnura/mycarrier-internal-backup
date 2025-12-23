import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    rectangle: {
      borderRadius: 4,
    },
    root: {
      background: color.general.soft,
      maxWidth: '100%',
    },
  }))();
};

export default useStyles;
