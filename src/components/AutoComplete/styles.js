import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    option: {
      '&:hover': {
        backgroundColor: color.primary.soft,
      },
      fontSize: 14,
      fontWeight: 400,
      paddingBottom: 8,
      paddingTop: 8,
    },
    paper: {
      borderRadius: '8px !important',
      boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08) !important',
    },
  }))();
};

export default useStyles;
