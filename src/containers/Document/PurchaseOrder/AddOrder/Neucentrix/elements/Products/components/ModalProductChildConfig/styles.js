import { css } from '@emotion/css';

const useStyles = () => {
  return {
    dialogRoot: css({
      borderRadius: 8,
      overflow: 'auto',
      padding: '12px 16px',
      width: '496px',
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
      maxHeight: '60vh',
      gap: 24,
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      overflowY: 'auto',
      padding: '12px 16px',
    }),
  };
};

export default useStyles;
