import { css } from '@emotion/css';

const useRootProductStyles = () => {
  return {
    ulRoot: css({
      margin: 0,
      padding: 0,
    }),
    liRoot: css({
      display: 'block',
      marginBottom: '0.5rem',
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
      gap: 12,
    }),
    itemPrefixColumn: css({
      display: 'flex',
      alignItems: 'start',
      flexDirection: 'column',
      gap: 2,
    }),
  };
};

export default useRootProductStyles;
