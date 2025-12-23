import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      padding: '32px 40px',
      width: 432,
    },
    resendButton: {
      fontWeight: 700,
      color: color.primary.main,
      cursor: 'pointer',
      '&:hover': {
        color: color.primary.mid,
      },
    },
  }))();
};

export default useStyles;
