import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useRespondentCategoryStyles = () => {
  return makeStyles((theme) => ({
    container: {
      display: 'flex',
      gap: 24,
      justifyContent: 'space-between',
      height: '100%',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    iconMax: {
      marginTop: 4,
      height: 16,
      width: 16,
      color: color.general.mid,
      cursor: 'pointer',
      '&:hover': {
        color: color.general.light,
      },
    },
    progressTrack: {
      width: '100%',
      borderRadius: 8,
      marginTop: 8,
      background: '#E5E8EA',
    },
    progressBar: {
      borderRadius: 8,
      height: 8,
      width: '50%',
    },
  }))();
};

export default useRespondentCategoryStyles;
