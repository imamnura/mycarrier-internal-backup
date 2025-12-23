import { css } from '@emotion/css';

const useFilterStyles = ({ search }) => {
  return {
    filterPadding: css({
      flexDirection: 'row-reverse',
      margin: '8px 0px',
    }),
    root: css({
      display: 'flex',
      justifyContent: search ? 'space-between' : 'flex-end',
      flexWrap: 'wrap',
      gap: 8,
    }),
  };
};

export default useFilterStyles;
