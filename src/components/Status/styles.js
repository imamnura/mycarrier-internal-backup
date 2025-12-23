import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = ({ variant, size, rounded }) => {
  const bgColor = {
    alert: color.orange.soft,
    danger: color.primary.soft,
    primary: color.blue.soft,
    success: color.green.soft,
    tag: color.grey.soft,
    warning: color.yellow.soft,
    purple: color.purple.soft,
    orange: color.orange.soft,
  }[variant];

  const sizes = {
    large: {
      borderRadius: rounded ? '50%' : 8,
      height: 39,
      padding: '0px 16px',
    },
    medium: {
      borderRadius: rounded ? '50%' : 4,
      height: 24,
      padding: '0px 8px',
    },
    small: {
      borderRadius: rounded ? '50%' : 4,
      height: 22,
      padding: '0px 8px',
    },
  };

  return makeStyles(() => ({
    root: {
      alignItems: 'center',
      background: bgColor,
      display: 'flex',
      textOverflow: 'ellipsis',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      ...sizes[size],
    },
  }))();
};

export default useStyles;
