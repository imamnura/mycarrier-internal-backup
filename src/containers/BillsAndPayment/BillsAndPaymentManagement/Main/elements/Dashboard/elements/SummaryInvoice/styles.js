import { makeStyles } from '@material-ui/core';

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

    clientStyles.summaryContainer = {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 32,
    };

    clientStyles.cardContainer = {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    };
  }
  return makeStyles(() => ({
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...clientStyles.header,
    },
    headerAction: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      ...clientStyles.header,
    },
    summaryContainer: {
      alignItems: 'center',
      display: 'flex',
      gap: 64,
      paddingTop: 16,
      ...clientStyles.summaryContainer,
    },
    chartContainer: {
      height: 140,
      position: 'relative',
      width: 280,
      '& > div': {
        alignItems: 'center',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        left: 0,
        position: 'absolute',
        right: 0,
      },
    },
    cardContainer: {
      display: 'flex',
      flexGrow: 1,
      gap: 16,
      ...clientStyles.cardContainer,
    },
  }))();
};

export default useStyles;
