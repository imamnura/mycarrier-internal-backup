import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    divider: {
      marginTop: -1,
    },
    flexContainerWithSwap: {
      justifyContent: 'space-between',
    },
    indicator: {
      height: 1,
    },
    root: {
      position: 'relative',
    },
    swap: {
      '&:hover': {
        backgroundColor: color.general.light,
      },
      backgroundColor: color.general.soft,
      height: 32,
      left: '50%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 32,
    },
    tab: {
      color: color.general.mid,
      fontSize: 14,
      fontWeight: '400',
      letterSpacing: '0.01em',
      lineHeight: '16px',
      minWidth: 0,
      padding: 0,
      textTransform: 'none',
    },
    tabSelected: {
      color: color.primary.main,
      fontWeight: 400,
    },
    tabSelectedCustom: {
      color: color.primary.main,
      fontWeight: 700,
    },
    tabSpacing: {
      marginLeft: 32,
    },
  }))();
};

export default useStyles;
