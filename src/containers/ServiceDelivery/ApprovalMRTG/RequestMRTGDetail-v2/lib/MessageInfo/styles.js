import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    docValue: {
      border: `1px solid ${color.general.mid}`,
      borderRadius: 8,
      padding: 24,
    },
  }))();
};

export default useStyles;
