import { makeStyles } from '@material-ui/core';

const useFollowupPopup = () => {
  return makeStyles(() => ({
    noData: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: '1rem',
      marginTop: '1rem',
      minWidth: '250px',
    },
    noDataContent: {
      height: '80px',
      width: '80px',
    },
  }))();
};

export default useFollowupPopup;
