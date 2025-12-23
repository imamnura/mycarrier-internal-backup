import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    closeIcon: {
      '&:hover': {
        background: color.primary.soft,
      },
      alignItems: 'center',
      borderRadius: 8,
      color: color.general.main,
      cursor: 'pointer',
      display: 'flex',
      height: 40,
      justifyContent: 'center',
      marginLeft: 16,
      minWidth: 40,
      width: 40,
    },
    root: {
      alignItems: 'center',
      borderBottom: `1px solid ${color.general.light}`,
      display: 'flex',
      flexDirection: 'row',
      height: 72,
      overflow: 'hidden',
      padding: 16,
    },
  }))();
};

export default useStyles;
