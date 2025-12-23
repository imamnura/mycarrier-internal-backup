import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = (props) => {
  const colors = {
    others: null,
    primary: color.primary.main,
    white: color.white,
    success: color.success[500],
  }[props.color || 'others'];

  return makeStyles(() => ({
    root: {
      color: colors,
    },
  }))();
};

export default useStyles;
