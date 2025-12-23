import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = (variant) => {
  const variants = {
    primary: {
      background: color.primary.soft,
    },
    success: {
      background: color.green.soft,
    },
  };

  return makeStyles(() => ({
    docValue: {
      ...variants[variant],
      borderRadius: 8,
      marginBottom: 20,
      marginTop: 20,
      overflowX: 'auto',
      padding: 16,
      paddingLeft: 25,
    },
  }))();
};

export default useStyles;
