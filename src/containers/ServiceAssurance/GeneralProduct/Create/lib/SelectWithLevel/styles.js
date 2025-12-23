import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = ({ rootEvent, isDisabled }) => {
  const menuIsOpen = !!rootEvent;
  let colorLabel = color.general.mid;

  const backgroundOpenMenu = menuIsOpen
    ? {
        background: color.primary.soft,
      }
    : {};

  return makeStyles(() => ({
    arrow: {
      height: 16,
      margin: '0px 16px',
      transform: menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
      transition: '200ms',
      width: 16,
    },
    emptyItem: {
      height: 32,
      width: 48,
    },
    labelSelect: {
      flexGrow: 1,
      fontSize: 16,
      fontWeight: 400,
      letterSpacing: '0.005em',
      lineHeight: '19px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textTransform: 'capitalize',
      whiteSpace: 'nowrap',
      margin: '0px 16px',
    },
    popover: {
      borderRadius: 8,
      boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
      padding: '12px 0',
      minWidth: 300,
    },
    label: {
      color: isDisabled
        ? `${color.general.light} !important`
        : `${colorLabel} !important`,
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    required: {
      marginRight: 2,
    },
    root: {
      '&:hover': {
        background: isDisabled ? 'transparent' : color.primary.soft,
        cursor: isDisabled ? 'default' : 'pointer',
      },
      ...backgroundOpenMenu,
      alignItems: 'center',
      borderRadius: 8,
      cursor: 'pointer',
      display: 'flex',
      height: 40,
      maxWidth: 240,
      minWidth: 120,
      transition: '200ms',
      userSelect: 'none',
      color: isDisabled ? color.general.light : color.general.main,
    },
    scroller: {
      '&:hover': {
        overflowY: 'overlay',
      },
      maxHeight: 32 * 8,
      overflowX: 'hidden',
      scrollBehavior: 'smooth',
    },
    rootList: {
      width: '100%',
      // maxWidth: 450,
    },
    nested: {
      paddingLeft: 32,
    },
  }))();
};

export default useStyles;
