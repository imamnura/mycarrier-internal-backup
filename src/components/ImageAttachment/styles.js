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
      height: 24,
      justifyContent: 'center',
      minWidth: 24,
      maxWidth: 24,
    },
    icon: {
      height: 16,
      width: 16,
    },
    root: {
      '&:hover': {
        backgroundColor: color.primary.soft,
      },
      borderRadius: 4,
      cursor: 'pointer',
      transition: '200ms',
      padding: 16,
      width: 192,
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    image: {
      background: 'white',
      borderRadius: 8,
      height: 160,
      objectFit: 'cover',
      width: 160,
      marginBottom: 12,
    },
  }))();
};

export default useStyles;
