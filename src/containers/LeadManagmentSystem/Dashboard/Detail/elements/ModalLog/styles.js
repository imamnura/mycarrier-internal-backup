import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      width: 580,
      maxWidth: 'calc(100% - 80px)',
      maxHeight: 'calc(100% - 60px)',
      padding: '32px 40px',
      overflowY: 'visible',
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
    },
    status: {
      height: 12,
      width: 12,
      marginLeft: 8,
      marginRight: 8,
      color: color.primary.main,
    },
    scroller: {
      '&:hover': {
        overflowY: 'overlay',
      },
      maxHeight: 32 * 14,
      overflowX: 'hidden',
      scrollBehavior: 'smooth',
    },
  }))();
};

export default useStyles;
