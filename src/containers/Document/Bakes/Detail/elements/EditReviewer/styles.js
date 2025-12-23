import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      padding: '32px 40px',
      width: 1192,
    },
    dashed: {
      border: `1px dashed ${color.general.light}`,
      width: '100%',
    },
  }))();
};

export default useStyles;
