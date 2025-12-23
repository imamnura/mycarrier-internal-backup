import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  const icon = {
    height: '10px',
    width: '14px',
    marginRight: '5px',
  };

  return makeStyles(() => ({
    number: {
      lineHeight: '40px !important',
      minHeight: 40,
      minWidth: 40,
    },
    numberCircle: {
      background: color.primary.main,
      borderRadius: '100%',
      display: 'inline-block',
      height: 40,
      textAlign: 'center',
      width: 40,
    },
    arrowDown: {
      ...icon,
      color: '#3BA064',
    },
    arrowUp: {
      ...icon,
      color: '#DE1B1B',
    },
    iconOrder: {
      ...icon,
      color: '#FAB005',
    },
  }))();
};

export default useStyles;
