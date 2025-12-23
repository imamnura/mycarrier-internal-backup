import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    arrow: {
      color: color.general.main,
    },
    tooltip: {
      background: color.general.main,
      fontSize: 10,
      letterSpacing: '0.015em',
      lineHeight: '14px',
    },
  }))();
};

export default useStyles;
