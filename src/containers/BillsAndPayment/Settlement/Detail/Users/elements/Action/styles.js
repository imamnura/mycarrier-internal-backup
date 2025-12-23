import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    actionBox: {
      border: `1px solid ${color.general.light}`,
      borderRadius: '8px',
      padding: '20px',
    },
    circleDivider: {
      backgroundColor: color.general.light,
      border: `1px solid ${color.general.light}`,
      borderRadius: '50%',
      height: 5,
      width: 5,
      display: 'inline-block',
      margin: '2px 5px',
    },
    divider: {
      backgroundColor: color.general.light,
      height: 60,
      width: 1,
      marginRight: 24,
    },
  }))();
};

export default useStyles;
