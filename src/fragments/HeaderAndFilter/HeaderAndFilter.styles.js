import { css } from '@emotion/css';
import color from '@styles/color';
import { useTheme } from '@material-ui/core';
const useHeaderAndFilterStyles = ({ smClient }) => {
  const theme = useTheme();
  return {
    actionButton: css({
      alignItems: 'center',
      display: 'flex',
      minHeight: 38,
      alignSelf: smClient ? 'end' : 'center',
    }),
    actionDivider: css({
      background: color.general.light,
      height: 24,
      marginLeft: 24,
      marginRight: 24,
      width: 1,
    }),
    filterPadding: css({
      flexDirection: 'row-reverse',
      margin: '8px 0px',
    }),
    root: css({
      margin: '0px 40px',
      paddingTop: 24,
    }),
    rootTabCustom: css({
      margin: '0px',
      marginBottom: 1,
      paddingTop: 0,
      paddingLeft: 40,
      backgroundColor: color.white,
      border: 'none',
      boxShadow:
        '0px 0px 2px 0px rgba(0, 0, 0, 0.20), 0px 2px 10px 0px rgba(0, 0, 0, 0.10)',
      position: 'relative',
      zIndex: 1,
    }),

    leftSection: css({
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      [theme.breakpoints.down('xs')]: {
        gap: 4,
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    }),
    mainHeader: css({
      gap: 16,
      height: smClient ? 'auto' : 74,
      position: 'sticky',
      top: 72,
      background: 'white',
      zIndex: 9,
      display: 'flex',
      alignItems: smClient ? 'start' : 'center',
      justifyContent: 'space-between',
      paddingLeft: '24px',
      paddingRight: '24px',
      boxShadow:
        '0px 0px 2px 0px rgba(0, 0, 0, 0.20), 0px 2px 10px 0px rgba(0, 0, 0, 0.10)',
      [theme.breakpoints.down('sm')]: {
        padding: '12px',
        flexDirection: 'row',
      },
    }),
    pageTitle: css({
      fontSize: 24,
      fontWeight: 700,
      [theme.breakpoints.down('sm')]: {
        fontSize: 18,
        fontWeight: 700,
      },
    }),
    status: css({
      display: 'flex',
      gap: 8,
    }),
  };
};

export default useHeaderAndFilterStyles;
