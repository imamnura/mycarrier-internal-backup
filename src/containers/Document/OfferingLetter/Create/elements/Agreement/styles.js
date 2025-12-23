import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    approvalTypeDesc: {
      fontSize: '14px !important',
      lineHeight: '15px',
      letterSpacing: '0.0025em',
      fontFamily: 'Titillium Web',
      color: color.general.mid,
      marginTop: 8,
    },
    dashed: {
      border: `1px dashed ${color.general.light}`,
      width: '100%',
    },
  }))();
};

export default useStyles;
