import { css } from '@emotion/css';

const useStyles = () => {
  return {
    content: css({
      marginTop: '12px',
      display: 'block',
    }),
    itemWrapper: css({
      backgroundColor: '#fff',
      padding: '14px 16px',
      boxShadow: '0px 0px 1px 0px #00000040, 0px 1px 1px 0px #0000000D',
      borderRadius: '4px',
      marginBottom: '8px',
    }),
    item: css({
      display: 'flex',
      justifyContent: 'start',
      width: 'auto',
      gap: 8,
    }),
    itemPrefix: css({
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }),
  };
};

export default useStyles;
