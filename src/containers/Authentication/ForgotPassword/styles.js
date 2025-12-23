import { makeStyles } from '@material-ui/core';
import color from '../../../styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    centered: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    link: {
      '&:hover': {
        color: color.primary.mid,
      },
      cursor: 'pointer',
    },
    notFoundImage: {
      height: 120,
      marginBottom: 40,
      width: 120,
    },
  }))();
};

export default useStyles;
