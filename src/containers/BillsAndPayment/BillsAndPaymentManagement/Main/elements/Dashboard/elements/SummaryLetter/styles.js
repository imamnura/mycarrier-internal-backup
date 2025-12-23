import color from '@styles/color';
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

    clientStyles.headerAction = {
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
    };
  }

  return {
    root: css({
      display: 'inline-flex',
      flexDirection: mobileClient ? 'column' : 'row',
      gap: 24,
      marginTop: 24,
      mb: 24,
      width: '100%',
    }),
    container: css({
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      width: '100%',
    }),
    header: css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...clientStyles.header,
    }),
    headerAction: css({
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      ...clientStyles.header,
    }),
    maximizeIcon: css({
      width: 12,
      height: 12,
      color: color.general.mid,
    }),
    total: css({
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      gap: 4,
    }),
    list: css({
      borderBottom: `1px solid ${color.general.soft}`,
      paddingBottom: 12,
      marginBottom: 12,
    }),
    listAction: css({
      '&:hover': {
        background: color.general.soft,
      },
      transition: '150ms',
      alignItems: 'center',
      borderRadius: 8,
      cursor: 'pointer',
      display: 'flex',
      gap: 8,
      padding: 12,
    }),
    circle: css({
      background: color.general.mid,
      borderRadius: '50%',
      height: 12,
      width: 12,
    }),
  };
};

export default useStyles;
