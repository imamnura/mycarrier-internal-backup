import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = ({ variant }) => {
  const colors = {
    info: {
      color: color.blue.main,
      background: color.blue.soft,
      borderColor: color.blue.main,
    },
    success: {
      color: color.green.main,
      background: color.green.soft,
      borderColor: color.green.main,
    },
    danger: {
      color: color.primary.main,
      background: color.primary.soft,
      borderColor: color.primary.main,
    },
    warning: {
      color: color.yellow.main,
      background: color.yellow.soft,
      borderColor: color.yellow.main,
    },
    alert: {
      color: color.orange.main,
      background: color.orange.soft,
      borderColor: color.orange.main,
    },
  }[variant];

  return makeStyles(() => ({
    baseBox: {
      background: colors.background,
      borderRadius: '16px',
      padding: '16px 0px',
    },
    title: {
      borderLeft: `4px solid ${colors.borderColor}`,
      paddingLeft: 24,
      height: 16,
      display: 'flex',
      alignItems: 'center',
    },
    content: {
      color: colors.color,
      paddingTop: 8,
      paddingLeft: 24,
    },
  }))();
};

export default useStyles;
