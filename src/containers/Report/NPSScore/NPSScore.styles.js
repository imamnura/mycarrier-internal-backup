import { makeStyles } from '@material-ui/core';

const useNpsScore = () => {
  return makeStyles((theme) => ({
    npsScore: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 2fr)',
      gridColumnGap: 24,
      gridRowGap: 24,
      padding: '24px 40px',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        padding: '12px 20px',
      },
    },
  }))();
};

export default useNpsScore;
