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
    general: {
      color: color.general.main,
      background: color.grey.soft,
      borderColor: color.general.main,
    },
  }[variant];

  return makeStyles(() => ({
    baseBox: {
      background: colors.background,
      borderRadius: '16px !important',
    },
    boxFlex: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    icon: {
      height: 87,
      opacity: 0.08,
      position: 'absolute',
      width: 80,
    },
    title: {
      borderLeft: `4px solid ${colors.borderColor}`,
      marginTop: '1rem',
      paddingLeft: 24,
      height: 16,
      display: 'flex',
      alignItems: 'center',
    },
    content: {
      marginBottom: 24,
      paddingTop: 8,
      paddingLeft: 24,
    },
    caption: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.5rem',
      paddingTop: 4,
      paddingLeft: 24,
      paddingRight: 24,
    },
  }))();
};

export default useStyles;
