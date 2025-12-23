import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    chip: {
      '& .MuiChip-label': {
        fontWeight: 700,
      },
      marginRight: '0.5rem',
      color: color.white,
      background: color.primary.main,
    },
  }))();
};

export default useStyles;
