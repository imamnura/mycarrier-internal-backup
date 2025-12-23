import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    tBody: {
      alignItems: 'center',
      borderBottom: `1px solid ${color.general.light}`,
      display: 'flex',
      height: 32,
    },
    tCell: {
      alignItems: 'center',
      display: 'flex',
      height: 30,
      padding: '0px 12px',
    },
    tHead: {
      background: color.general.soft,
    },
  }))();
};

export default useStyles;
