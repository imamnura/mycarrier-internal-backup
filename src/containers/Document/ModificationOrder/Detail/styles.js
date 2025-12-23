import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    box: {
      backgroundColor: color.primary.soft,
      border: `1px solid ${color.primary.main}`,
      borderRadius: 8,
      color: color.primary.main,
      margin: '24px',
      padding: 24,
      textAlign: 'center',
      width: '90%',
    },
  }))();
};

export default useStyles;
