import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    cardContainer: {
      alignItems: 'stretch',
      // marginTop: 16,
      // padding: '0 32px'
    },
    card: {
      background: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: '0px 2px 9px rgb(46 67 77 / 8%)',
      display: 'flex',
      alignItems: 'center',
      height: '160px',
    },
    emptyCard: {
      backgroundColor: color.general.soft,
      boxShadow: 'none !important',
    },
    emptyImage: {
      width: '30%',
      height: '100%',
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center',
    },
    icon: {
      color: '#B3C3CA',
      width: 67,
      height: 67,
    },
  }))();
};

export default useStyles;
