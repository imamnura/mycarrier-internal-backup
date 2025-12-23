import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = ({ variant, fitToContent }) => {
  const iconColor = {
    failed: color.primary.main,
    success: color.green.main,
  }[variant];

  return makeStyles(() => ({
    icon: {
      color: iconColor,
      height: 80,
      width: 80,
      marginBottom: 20,
    },
    root: {
      alignItems: 'center',
      borderRadius: 16,
      display: 'flex',
      flexDirection: 'column',
      minWidth: fitToContent ? 'max-content' : 432,
      padding: '32px 40px',
      width: fitToContent ? 'max-content' : 432,
    },
  }))();
};

export default useStyles;
