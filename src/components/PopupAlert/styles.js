import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = ({ variant }) => {
  const iconColor = {
    failed: color.primary.main,
    success: color.green.main,
  }[variant];

  return makeStyles(() => ({
    icon: {
      color: iconColor,
      height: 80,
      width: 80,
    },
    newPhaseIcon: {
      width: 280,
      height: 'auto',
      color: '#F8F9FA',
    },
    loading: {
      alignItems: 'center',
      display: 'flex',
      height: 80,
      justifyContent: 'center',
      width: 80,
    },
    root: {
      alignItems: 'center',
      borderRadius: 16,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 432,
      padding: '32px 40px',
      width: 432,
    },
  }))();
};

export default useStyles;
