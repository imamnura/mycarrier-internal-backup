import { css } from '@emotion/css';

const useStyles = () => {
  return {
    dialogRoot: css({
      borderRadius: 8,
      overflow: 'auto',
      padding: '12px 16px',
      width: '512px',
    }),
    wrapper: css({
      display: 'flex',
      flexDirection: 'column',
    }),
    headerWrapper: css({
      display: 'flex',
      justifyContent: 'space-between',
      gap: 24,
      width: '100%',
      padding: '12px 16px 12px 16px',
    }),
    titleWrapper: css({
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
    }),
    stepperWrapper: css({
      minWidth: 256,
      flexGrow: 1,
    }),
    footerWrapper: css({
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
      width: '100%',
      padding: '12px 16px 12px 16px',
    }),
    contentWrapper: css({
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      maxHeight: '60vh',
      gap: 24,
      width: '100%',
      padding: '12px 16px',
      overflowY: 'auto',
    }),
    cardGrandchildContainer: css({
      gridColumn: 'span 2',
      display: 'flex',
      padding: '16px',
      flexDirection: 'column',
      gap: '12px',
      borderRadius: '8px',
      boxShadow:
        '0px 2px 10px 0px rgba(0, 0, 0, 0.10), 0px 0px 2px 0px rgba(0, 0, 0, 0.20)',
    }),
  };
};

export default useStyles;
