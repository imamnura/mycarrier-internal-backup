import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = ({ alignItems, size }) => {
  const number = {
    default: {
      minHeight: 40,
      minWidth: 40,
      width: 40,
    },
    small: {
      minHeight: 16,
      minWidth: 16,
      width: 16,
    },
  }[size];
  return makeStyles(() => ({
    content: {
      overflowWrap: 'break-word',
    },
    number: {
      alignItems: 'center',
      background: color.primary.main,
      borderRadius: '100%',
      display: 'flex',
      justifyContent: 'center',
      ...number,
    },
    root: {
      display: 'flex',
      alignItems: alignItems,
    },
  }))();
};

export default useStyles;
