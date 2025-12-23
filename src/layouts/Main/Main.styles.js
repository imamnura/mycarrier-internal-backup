import { css } from '@emotion/css';

const useMainStyles = ({ smClient, expand }) => {
  // dynamic following navigation width
  let contentLP = 0;

  if (!smClient) {
    if (expand) {
      contentLP = 248;
    } else {
      contentLP = 72;
    }
  }

  return {
    content: css({
      transition: '200ms',
      maxWidth: smClient ? '100%' : 'calc(100% - 8px)',

      position: 'relative',
      marginLeft: contentLP,
      marginTop: 72,
    }),
  };
};

export default useMainStyles;
