import color from '@styles/color';
import { css } from '@emotion/css';

const useTabsMainStyles = () => {
  return {
    tabGroup: css({
      display: 'flex',
      alignItems: 'flex-end',
    }),
    tab: css({
      padding: '16px 24px',
      background: 'rgba(255, 255, 255, 0.64)',
      boxShadow: '0px 6px 9px 0px rgba(46, 67, 77, 0.08)',
      borderRadius: '8px 8px 0px 0px',
      fontWeight: 300,
      fontSize: 14,
      cursor: 'pointer',
    }),
    tabActive: css({
      color: color.primary.main,
      background: color.white,
      fontWeight: 600,
    }),
  };
};

export default useTabsMainStyles;
