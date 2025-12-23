import { makeStyles } from '@material-ui/core';

const useNpsScoreSummary = () => {
  return makeStyles((theme) => ({
    container: {
      alignItems: 'center',
      display: 'grid',
      height: '100%',
      gap: 16,
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'repeat(6, 1fr)',
      },
    },
    item: {
      padding: '12px',
      borderRadius: 8,
      border: '1px solid #D2D8DA',
      width: '100%',
    },
    diff: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      gap: 2,
      padding: '2px 4px',
      borderRadius: 4,
    },
    diffIcon: {
      width: 'auto',
      height: 6,
    },
    diffIconNegative: {
      transform: 'rotate(180deg)',
    },
    progressTrack: {
      width: '100%',
      borderRadius: 8,
      marginTop: 8,
      background: '#F9A63A',
    },
    progressBar: {
      borderRadius: 8,
      height: 8,
      width: '50%',
    },
    containerDetail: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '12px',
      alignSelf: 'stretch',
    },
    label: {
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: '28px',
    },

    respondentSummary: {
      background: '#F8F9FA',
      width: '100%',
      borderRadius: '4px',
      padding: '8px',
    },

    statusContainer: {
      display: 'flex',
      gap: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },

    statusItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    statusRespondentIcon: {
      display: 'flex',
      gap: 12,
      width: '100%',
      marginTop: 4,
      padding: 8,
      justifyContent: 'space-around',
    },

    npsJourney: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 2fr)',
      gridColumnGap: 24,
      gridRowGap: 24,
      padding: '24px 40px',
    },
  }))();
};

export default useNpsScoreSummary;
