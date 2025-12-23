import { css } from '@emotion/css';

const useNewFormStyles = () => {
  return {
    option: css({
      marginBottom: '10px',
    }),
    buttonAddOption: css({
      padding: '0px !important',
    }),
    labelOption: css({
      fontSize: '14px',
      fontStyle: 'normal',
      lineHeight: '20px',
      fontWeight: '600',
      color: '#151718',
      marginBottom: '8px',
      display: 'block',
    }),
  };
};

export default useNewFormStyles;
