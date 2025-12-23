import { css } from '@emotion/css';

const usePICFormStyles = () => {
  return {
    title: css({
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '24px',
    }),
    root: css({
      margin: '0.5rem 0px',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0px 0px 2px 0px #00000033, 0px 2px 10px 0px #0000001A',
      padding: '24px',
    }),
    label: css({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),
    content: css({
      marginTop: '12px',
    }),
    ulRoot: css({
      margin: 0,
      padding: 0,
    }),
    liRoot: css({
      display: 'block',
      marginBottom: '0.25rem',
    }),
    item: css({
      backgroundColor: '#fff',
      padding: '14px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0px 0px 1px 0px #00000040, 0px 1px 1px 0px #0000000D',
      borderRadius: '4px',
    }),
    itemPrefix: css({
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }),
  };
};

export default usePICFormStyles;
