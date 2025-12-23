import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    clickToAction: {
      alignItems: 'center',
      background: color.general.soft,
      color: color.general.main,
      borderRadius: 8,
      cursor: 'pointer',
      padding: '0px 16px',
      display: 'flex',
      height: 40,
      justifyContent: 'space-between',
      marginTop: 16,
    },
    ctaIcon: {
      height: 16,
      width: 16,
    },
  }))();
};

export default useStyles;
