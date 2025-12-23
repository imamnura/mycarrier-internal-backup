import { makeStyles } from '@material-ui/core';
import color from '../../../../styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    actionButton: {
      alignItems: 'center',
      display: 'flex',
    },
    actionDivider: {
      background: color.general.light,
      height: 24,
      marginLeft: 12,
      marginRight: 12,
      width: 1,
    },
    buttonMargin: {
      marginRight: 12,
    },
  }))();
};

export default useStyles;
