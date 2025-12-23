import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    child: {
      alignItems: 'center',
      borderBottom: `1px solid ${color.general.light}`,
      display: 'flex',
      padding: '12px ',
    },
    container: {
      position: 'relative',
      width: '100%',
    },
    containerChild: {
      width: 'auto',
      minHeight: '15vh',
    },
    containerChildHide: {
      width: 'auto',
      overflow: 'auto',
      height: '20vh',
    },
    parent: {
      alignItems: 'center',
      background: color.grey.soft,
      display: 'flex',
      padding: '4px 12px',
    },
  }))();
};

export default useStyles;
