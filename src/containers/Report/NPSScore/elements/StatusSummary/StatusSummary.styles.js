import { makeStyles } from '@material-ui/core';

const useStatusSummary = () => {
  return makeStyles((theme) => ({
    statusSummary: {
      display: 'flex',
      gap: '8px',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
  }))();
};

export default useStatusSummary;
