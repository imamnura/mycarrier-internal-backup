import { css } from '@emotion/css';

const useStyles = ({ mobileClient }) => {
  const clientStyles = {
    header: {},
    headerAction: {},
    summaryContainer: {},
  };

  if (mobileClient) {
    clientStyles.header = {
      justifyContent: 'flex-start',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'flex-start',
    };
  }
  return {
    border: css({
      borderBottom: '1px solid #E5E8EA',
      margin: '24px 0',
      height: '1px',
      width: '100%',
    }),
    cardContainer: css({
      display: 'flex',
      flexGrow: 1,
      gap: 16,
      overflow: 'auto',
      ...clientStyles.cardContainer,
    }),
    card: css({
      minWidth: '150px',
      width: '100%',
      marginBottom: '8px',
    }),
    wrapper: css({
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      paddingTop: '24px',
    }),
  };
};

export default useStyles;
