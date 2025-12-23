import { css } from '@emotion/css';

const useStyles = ({ mobileClient }) => {
  const clientStyles = {
    cardContainer: {},
  };

  if (mobileClient) {
    clientStyles.cardContainer = {};
  }
  return {
    cardContainer: css({
      display: 'flex',
      flexGrow: 1,
      gap: 16,
      overflow: 'auto',
      ...clientStyles.cardContainer,
    }),
  };
};

export default useStyles;
