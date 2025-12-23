import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      padding: '32px 40px',
      width: 400,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    actionDivider: {
      background: color.general.light,
      height: 24,
      marginLeft: 16,
      marginRight: 16,
      width: 1,
    },
  }))();
};

export default useStyles;
