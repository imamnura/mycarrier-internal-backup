import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = ({ variant }) => {
  const variants = {
    warning: {
      background: color.yellow.soft,
      border: `1px solid ${color.yellow.main}`,
    },
    danger: {
      background: color.primary.soft,
      border: `1px solid ${color.primary.main}`,
    },
  }[variant];
  return makeStyles(() => ({
    root: {
      textAlign: 'center',
      border: `1px solid ${color.general.light}`,
      borderRadius: 16,
      padding: 40,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      ...variants,
    },
    action: {
      paddingTop: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
    },
  }))();
};

export default useStyles;
