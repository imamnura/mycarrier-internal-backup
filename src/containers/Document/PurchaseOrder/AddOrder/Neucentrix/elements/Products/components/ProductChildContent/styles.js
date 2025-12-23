import { css } from '@emotion/css';

const useStyles = () => {
  return {
    addProductButton: css({
      position: 'sticky',
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      zIndex: 2,
    }),
    cardGrandchild: css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
      padding: 48,
      gap: 10,
      textAlign: 'center',
    }),

    grandChildTitle: css({
      display: 'flex',
      gap: 8,
    }),
    grandChildAction: css({
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8,
    }),
    headerWrapper: css({
      display: 'flex',
      justifyContent: 'space-between',
      gap: 24,
      width: '100%',
      gridColumn: 'span 2',
    }),
    cardGrandchildContainer: css({
      padding: '16px',
      gap: '12px',
      borderRadius: '8px',
      boxShadow:
        '0px 2px 10px 0px rgba(0, 0, 0, 0.10), 0px 0px 2px 0px rgba(0, 0, 0, 0.20)',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      width: '100%',
    }),
  };
};

export default useStyles;
