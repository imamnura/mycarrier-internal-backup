import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = ({ variant, type = 'ghost', label, loading }) => {
  const textColor = {
    add: type == 'filled' ? color.success[500] : color.green.main,
    edit: color.yellow.main,
    delete: color.primary.main,
    trash: color.primary.main,
    pencil: color.yellow.main,
    minus: color.primary.main,
  }[variant];

  const bgColor = {
    add: color.success[50],
  }[variant];

  return makeStyles(() => ({
    root: {
      background: type == 'filled' ? bgColor : color.white,
      padding: 8,
      marginRight: label ? -16 : 0,
      borderRadius: 20,
    },
    icon: {
      color: textColor,
      marginRight: label ? 16 : 0,
    },
    label: {
      color: `${textColor} !important`,
      overflow: 'hidden',
      paddingRight: label ? 8 : 0,
      paddingLeft: loading ? 8 : 0,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  }))();
};

export default useStyles;
