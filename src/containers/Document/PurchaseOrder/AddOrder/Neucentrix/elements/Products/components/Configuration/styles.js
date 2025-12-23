import { css } from '@emotion/css';
import color from '@styles/color';

const useStyles = () => {
  return {
    childProductBox: css({
      minHeight: 380,
      maxHeight: 380,
      display: 'flex',
      width: '100%',
      border: `solid 1px ${color.general.light}`,
      borderRadius: '12px',
      overflow: 'hidden',
      zIndex: 0,
    }),
    tabContainer: css({
      minHeight: 380,
      maxHeight: 380,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: color.general.soft,
      width: '35%',
      overflowY: 'auto',
      borderRight: `solid 1px ${color.general.light}`,
      position: 'relative',
    }),
    contentProductContainer: css({
      minHeight: 380,
      maxHeight: 380,
      display: 'flex',
      flexDirection: 'column',
      width: '65%',
      overflowY: 'auto',
      zIndex: 5,
      position: 'relative',
      gap: 12,
      padding: '20px 20px 12px 20px ',
    }),
    tabItem: css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: color.general.soft,
      width: '100%',
      padding: 16,
      gap: 8,
      borderBottom: `solid 1px ${color.general.light}`,
      cursor: 'pointer',
      transition:
        'background-color 0.3s ease, box-shadow 0.3s ease, border-left 0.3s ease',
      '&:hover': {
        backgroundColor: color.grey.soft,
      },
    }),
    tabItemActive: css({
      backgroundColor: color.white,
      borderLeft: `solid 4px ${color.primary.main}`,
      boxShadow:
        '0px 2px 10px 0px rgba(0, 0, 0, 0.10), 0px 0px 2px 0px rgba(0, 0, 0, 0.20)',
      transition:
        'background-color 0.3s ease, box-shadow 0.3s ease, border-left 0.3s ease',
      cursor: 'default',
      zIndex: 3,
      '&:hover': {
        backgroundColor: color.white,
      },
    }),
    addProductButton: css({
      position: 'sticky',
      bottom: 0,
      padding: '12px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      zIndex: 5,
    }),
    notFoundContainer: css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
      padding: 16,
      gap: 10,
      textAlign: 'center',
    }),
  };
};

export default useStyles;
