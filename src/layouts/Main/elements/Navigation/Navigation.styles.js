import { BackgroundNewDashboard } from '@configs/image';
import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useNavigationStyles = ({ expand, smClient }) => {
  let rootLgClient = {};

  if (!smClient && expand) {
    rootLgClient = {
      overflowX: 'hidden',
      overflowY: 'auto',
      boxShadow: '0px 4px 10px 0px rgba(46, 67, 77, 0.08)',
      display: 'flex',
      flexDirection: 'column',
    };
  }

  return makeStyles(() => ({
    mainMenu: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 24px',
      gap: 16,
      width: '100%',
      cursor: 'pointer',
    },
    mainMenuTitle: {
      flexGrow: 1,
    },
    mainMenuTitleActive: {
      fontWeight: 700,
    },
    mainMenuArrow: {
      height: 16,
      width: 16,
    },
    menuContainer: {
      borderLeft: `1px solid ${color.general.light}`,
      marginLeft: 36,
      paddingLeft: 28,
      paddingRight: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5px',
      transition: 'max-height 200ms ease',
      maxHeight: 0,
      overflow: 'hidden',
    },
    menu: {
      '&:hover': {
        background: color.primary.soft,
      },
      color: color.general.main,
      alignItems: 'center',
      cursor: 'pointer',
      padding: '8px 12px',
      transition: '200ms',
      userSelect: 'none',
      borderRadius: 6,
      textDecoration: 'none',
    },
    menuActive: {
      background: color.primary.soft,
      color: color.primary.main,
      fontWeight: 600,
    },
    closeIcon: {
      left: 248,
      position: 'fixed',
      top: 24,
    },
    drawer: {
      background: color.white,
      boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      minWidth: 300,
      overflow: 'auto',
    },
    icon: {
      '& .icon': {
        height: 24,
        width: 24,
      },
      '&:hover': {
        background: color.primary.soft,
      },
      border: 'none',
      alignItems: 'center',
      borderRadius: 8,
      cursor: 'pointer',
      display: 'flex',
      height: 40,
      justifyContent: 'center',
      minHeight: 40,
      minWidth: 40,
      transition: '200ms',
      width: 40,
      background: color.white,
    },
    root: {
      height: smClient ? '100%' : 'calc(100vh - 72px)',
      top: smClient ? 0 : 72,
      paddingTop: smClient ? 64 : 0,
      position: smClient ? 'relative' : 'fixed',
      transition: 'width 200ms',
      width: expand ? 248 : 72,
      zIndex: 10,
      background: expand ? color.white : 'transparent',
      ...rootLgClient,
    },
    menuIcon: {
      width: 24,
      height: 24,
      cursor: 'pointer',
      color: color.general.main,
      '&:hover': {
        color: color.general.mid,
      },
      // padding: 2,
    },
    newDashboardContainer: {
      background: 'linear-gradient(288deg, #C6D5E2 26.96%, #F1F4F5 97.88%)',
      borderRadius: 16,
    },
    newDashboard: {
      borderRadius: 16,
      background: `url(${BackgroundNewDashboard})`,
      padding: '12px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '102px 132px',
      backgroundPosition: 'right bottom',
      transition: 'all 150ms ease-in',
      '&:hover': {
        backgroundSize: '122px 152px',
      },
    },
  }))();
};

export default useNavigationStyles;
