import { makeStyles } from '@material-ui/core';
import color from '../../../../../../styles/color';

const useStyles = ({ smClient, open }) => {
  const menuIsOpen = !!open;
  let smClickableIcon = {};

  if (smClient) {
    smClickableIcon = {
      marginRight: 8,
    };
  }

  return makeStyles(() => ({
    clickableIcon: {
      '& .icon': {
        height: 24,
        width: 24,
      },
      '&:hover': {
        background: color.primary.soft,
      },
      alignItems: 'center',
      background: menuIsOpen ? color.primary.soft : color.white,
      borderRadius: 8,
      cursor: 'pointer',
      display: 'flex',
      height: 40,
      justifyContent: 'center',
      marginRight: 16,
      minHeight: 40,
      minWidth: 40,
      transition: '200ms',
      width: 40,
      ...smClickableIcon,
    },
    header: {
      borderBottom: `1px solid ${color.general.soft}`,
      color: color.general.dark,
      padding: '16px 24px',
    },
    item: {
      '&:hover': {
        background: color.primary.soft,
      },
      cursor: 'pointer',
      display: 'flex',
      padding: '16px 24px',
      transition: '200ms',
    },
    itemContainer: {
      maxHeight: 480,
      overflow: 'scroll',
      paddingBottom: 8,
    },
    itemContent: {
      '& > strong': {
        color: color.general.dark,
        fontWeight: 400,
      },
    },
    itemHeader: {
      '& > :first-child': {
        marginRight: 8,
      },
      alignItems: 'center',
      display: 'flex',
      paddingBottom: 8,
    },
    itemIcon: {
      alignItems: 'center',
      background: color.primary.main,
      borderRadius: '100%',
      color: color.white,
      display: 'flex',
      height: 40,
      justifyContent: 'center',
      marginRight: 16,
      minWidth: 40,
      width: 40,
    },
    itemUnread: {
      background: color.primary.soft,
    },
    root: {
      background: color.white,
      borderRadius: 8,
      boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
      width: 344,
    },
  }))();
};

export default useStyles;
