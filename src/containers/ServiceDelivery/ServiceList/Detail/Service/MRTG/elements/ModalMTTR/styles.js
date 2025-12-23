import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    root: {
      '& .MuiPaginationItem-root': {
        color: color.general.main,
        borderRadius: '8px',
      },
      '& .Mui-selected': {
        '&:hover': {
          backgroundColor: color.primary.mid,
        },
        backgroundColor: color.primary.main,
        color: `${color.white} !important`,
      },
    },
  }))();
};

export default useStyles;
