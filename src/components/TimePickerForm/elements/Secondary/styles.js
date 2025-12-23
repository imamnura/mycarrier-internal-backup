import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    emptyItem: {
      height: 32,
      width: 48,
    },
    scroller: {
      '&:hover': {
        overflowY: 'overlay',
      },
      maxHeight: 32 * 7,
      overflow: 'hidden',
      overflowX: 'hidden',
      scrollBehavior: 'smooth',
    },
    scrollItem: {
      '&:hover': {
        background: color.primary.soft,
      },
      alignItems: 'center',
      borderRadius: 4,
      cursor: 'pointer',
      display: 'flex',
      height: 32,
      justifyContent: 'center',
      marginRight: 5,
      transition: '250ms',
      userSelect: 'none',
      width: 48,
    },
    scrollItemActive: {
      '&:hover': {
        background: color.primary.dark,
      },
      background: color.primary.main,
      borderRadius: 0,
      color: color.white,
      marginRight: 0,
      paddingRight: 5,
    },
    scrollItemDisabled: {
      '&:hover': {
        background: color.white,
      },
      background: color.white,
      color: color.general.light,
      cursor: 'not-allowed',
    },
    scrollItemActiveHour: {
      borderBottomLeftRadius: 4,
      borderTopLeftRadius: 4,
      width: 53,
    },
    scrollItemActiveMinute: {
      width: 53,
    },
    scrollItemActiveSecond: {
      borderBottomRightRadius: 4,
      borderTopRightRadius: 4,
      paddingLeft: 5,
    },
    separator: {
      alignItems: 'center',
      display: 'flex',
      height: 32,
      justifyContent: 'center',
      transition: '250ms',
      width: 5,
      marginLeft: -5,
      color: 'transparent',
    },
    separatorActive: {
      color: color.white,
    },
  }))();
};

export default useStyles;
