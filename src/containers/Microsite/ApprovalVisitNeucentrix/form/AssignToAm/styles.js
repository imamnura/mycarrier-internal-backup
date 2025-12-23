import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = makeStyles(() => ({
  chip: {
    '& .MuiChip-deleteIcon': {
      color: color.primary.main,
    },
    '& .MuiChip-label': {
      color: color.general.mid,
    },
    marginRight: '0.5rem',
    marginTop: '0.75rem',
  },
}));

export default useStyles;
