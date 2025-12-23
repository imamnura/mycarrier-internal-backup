import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      width: 432,
      maxWidth: 'calc(100% - 80px)',
      maxHeight: 'calc(100% - 80px)',
      padding: '32px 40px',
      overflowY: 'visible',
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
    },
    actionDivider: {
      background: color.general.light,
      height: 24,
      margin: 10,
      marginTop: 15,
      width: 1,
    },
  }))();
};

export default useStyles;
