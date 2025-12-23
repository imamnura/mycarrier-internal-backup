import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = ({ rootEvent, smClient }) => {
  let menuWidth = rootEvent?.offsetWidth;
  const menuIsOpen = !!rootEvent;

  if (smClient) {
    menuWidth = 200;
  }

  const backgroundOpenMenu = menuIsOpen
    ? {
        background: color.primary.soft,
      }
    : {};

  return makeStyles(() => ({
    account: {
      height: 24,
      margin: '0px 12px 0px 16px',
      width: 24,
    },
    arrow: {
      height: 16,
      margin: '0px 16px',
      transform: menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
      transition: '200ms',
      width: 16,
    },
    iconOnly: {
      '& .icon': {
        height: 24,
        width: 24,
      },
      '&:hover': {
        background: color.primary.soft,
      },
      alignItems: 'center',
      borderRadius: 8,
      cursor: 'pointer',
      display: 'flex',
      height: 40,
      justifyContent: 'center',
      marginRight: 8,
      minHeight: 40,
      minWidth: 40,
      transition: '200ms',
      width: 40,
    },
    label: {
      flexGrow: 1,
      fontSize: 16,
      fontWeight: 400,
      letterSpacing: '0.005em',
      lineHeight: '19px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textTransform: 'capitalize',
      whiteSpace: 'nowrap',
    },
    menuItem: {
      '& .icon': {
        height: 16,
        marginRight: 16,
        width: 16,
      },
      '&:hover': {
        background: color.primary.soft,
      },
      alignItems: 'center',
      color: color.general.main,
      cursor: 'pointer',
      display: 'flex',
      height: 32,
      padding: '0px 16px',
      userSelect: 'none',
    },
    popover: {
      borderRadius: 8,
      boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
      padding: '12px 0',
      width: menuWidth || 200,
    },
    root: {
      '&:hover': {
        background: color.primary.soft,
      },
      ...backgroundOpenMenu,
      alignItems: 'center',
      borderRadius: 8,
      cursor: 'pointer',
      display: 'flex',
      height: 40,
      maxWidth: 240,
      minWidth: 150,
      transition: '200ms',
      userSelect: 'none',
    },
  }))();
};

export default useStyles;
