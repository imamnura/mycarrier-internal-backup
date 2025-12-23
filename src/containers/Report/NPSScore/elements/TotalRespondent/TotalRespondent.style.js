import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useTotalRespondent = () => {
  return makeStyles(() => ({
    container: {
      alignItems: 'center',
      display: 'grid',
      height: '100%',
      gap: 16,
      gridTemplateColumns: 'repeat(6, 1fr)',
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
  }))();
};

export default useTotalRespondent;
