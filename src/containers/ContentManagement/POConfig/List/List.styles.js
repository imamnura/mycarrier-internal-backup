import { css } from '@emotion/css';

const useListStyles = () => {
  return {
    operations: css({
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }),
  };
};

export default useListStyles;
