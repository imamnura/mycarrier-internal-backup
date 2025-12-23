import { makeStyles } from '@material-ui/core';

const useStyles = ({ mobileClient }) => {
  const clientStyles = {
    header: {},
    headerAction: {},
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
  }))();
};

export default useStyles;
