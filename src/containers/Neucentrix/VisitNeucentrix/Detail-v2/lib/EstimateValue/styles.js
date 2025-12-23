import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = (variant) => {
  const variants = {
    primary: {
      background: color.primary.soft,
      border: `1px solid ${color.primary.main}`,
    },
    success: {
      background: color.green.soft,
      border: `1px solid ${color.green.main}`,
    },
  };

  return makeStyles(() => ({
    docValue: {
      ...variants[variant],
      borderRadius: 8,
      overflowX: 'auto',
      padding: 24,
      textAlign: 'center',
      width: '90%',
      marginTop: 20,
    },
  }))();
};

export default useStyles;
