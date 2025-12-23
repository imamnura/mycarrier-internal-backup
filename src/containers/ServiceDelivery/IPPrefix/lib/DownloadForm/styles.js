import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = ({ disabled, error, focus }) => {
  let colorHelper = color.general.main;
  let colorLabel = color.general.mid;

  if (focus) {
    colorLabel = color.general.main;
  }

  if (disabled) {
    colorHelper = color.general.light;
    colorLabel = color.general.light;
  }

  if (error) {
    colorHelper = color.primary.main;
    colorLabel = color.primary.main;
  }

  return makeStyles(() => ({
    helper: {
      alignItems: 'center',
      color: colorHelper,
      display: 'flex',
      justifyContent: 'space-between',
      minHeight: 18,
      paddingTop: 4,
      textAlign: 'left',
      width: '100%',
    },
    helperError: {
      color: color.primary.main,
    },
    label: {
      color: `${colorLabel} !important`,
    },
    required: {
      marginRight: 2,
    },
  }))();
};

export default useStyles;
