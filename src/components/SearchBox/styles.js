import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = ({ xsClient, size, fullWidth }) => {
  const sizes = {
    default: 320,
    large: 440,
  }[size];

  return makeStyles(() => ({
    icon: {
      height: 16,
      width: 16,
      stroke: 1,
    },
    root: {
      '&::placeholder': {
        color: color.general.mid,
        opacity: 1,
      },
      '&:focus': {
        borderColor: color.general.main,
      },
      backgroundColor: color.white,
      border: `1px solid ${color.general.mid}`,
      borderRadius: 8,
      boxSizing: 'border-box',
      color: color.general.main,
      fontSize: 16,
      height: 40,
      padding: '0px 16px',
      position: 'relative',
      width: xsClient || fullWidth ? '100%' : sizes,
    },
    noBorder: {
      borderStyle: 'hidden',
    },
  }))();
};

export default useStyles;
