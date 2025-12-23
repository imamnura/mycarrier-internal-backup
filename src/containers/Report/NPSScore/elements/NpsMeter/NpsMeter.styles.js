import { makeStyles } from '@material-ui/core';

const useNpsMeterStyles = () => {
  return makeStyles(() => ({
    container: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100%',
    },
    gauge: {
      position: 'relative',
      width: 270,
      height: 124,
    },
    diff: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      gap: 4,
      padding: '2px 4px',
      borderRadius: 4,
    },
    diffIcon: {
      width: 11,
      height: 7,
    },
    diffIconNegative: {
      transform: 'rotate(180deg)',
    },
  }))();
};

export default useNpsMeterStyles;
