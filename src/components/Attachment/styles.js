import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    actionIcon: {
      alignItems: 'center',
      background: color.primary.main,
      borderRadius: '100%',
      color: 'white',
      display: 'flex',
      height: 32,
      justifyContent: 'center',
      minWidth: 32,
      maxWidth: 32,
    },
    icon: {
      height: 32,
      width: 32,
    },
    root: {
      '&:hover': {
        backgroundColor: color.primary.soft,
      },
      alignItems: 'center',
      borderRadius: 4,
      cursor: 'pointer',
      display: 'flex',
      height: 56,
      padding: 16,
      transition: '200ms',
      width: '100%',
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: 100,
    },
  }))();
};

export default useStyles;
