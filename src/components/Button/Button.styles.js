import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useButtonStyles = ({ ml, mr, textTransform, rounded }) => {
  const borderRadius = {
    full: '99999px !important',
  }[rounded];

  return makeStyles(() => ({
    icon: {
      height: 20,
      width: 20,
    },
    label: {
      textTransform: textTransform,
    },
    button: {
      marginLeft: `${ml}px !important`,
      marginRight: `${mr}px !important`,
      height: '38px !important',
      borderRadius: borderRadius,
      '&.legion-button:disabled': {
        backgroundColor: color.secondary[100],
        color: color.secondary[300],
      },
    },
  }))();
};

export default useButtonStyles;
