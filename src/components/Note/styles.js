import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = ({ variant }) => {
  const variants =
    {
      danger: {
        color: color.primary.main,
        background: color.primary.soft,
        border: `1px solid ${color.primary.main}`,
      },
      success: {
        color: color.green.main,
        background: color.green.soft,
        border: `1px solid ${color.green.main}`,
      },
      general: {
        color: color.general.main,
        background: color.grey.soft,
        border: `1px solid ${color.general.light}`,
      },
    }[variant] || {};

  return makeStyles(() => ({
    root: {
      ...variants,
      padding: 24,
      textAlign: 'center',
      borderRadius: 8,
      boxSizing: 'border-box',
    },
  }))();
};

export default useStyles;
