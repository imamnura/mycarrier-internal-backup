import { css } from '@emotion/css';

const useStyles = () => {
  return {
    container: css({
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100%',
    }),
    gauge: css({
      position: 'relative',
      width: 270,
      height: 124,
    }),
    diff: css({
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      gap: 4,
      padding: '2px 4px',
      borderRadius: 4,
    }),
    diffIcon: css({
      width: 11,
      height: 7,
    }),
    diffIconNegative: css({
      transform: 'rotate(180deg)',
    }),
    title: css({
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      margin: '0 auto',
      width: 'fit-content',
    }),
    totalOrder: css({
      bottom: 40,
    }),
  };
};

export default useStyles;
