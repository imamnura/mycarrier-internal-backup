import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = ({ disabled, error }) => {
  let colorHelper = color.general.main;

  if (disabled) {
    colorHelper = color.general.light;
  }

  if (error) {
    colorHelper = color.primary.main;
  }

  return makeStyles(() => ({
    helper: {
      alignItems: 'center',
      color: colorHelper,
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 4,
      minHeight: 18,
      textAlign: 'left',
      width: '100%',
    },
    helperError: {
      color: color.primary.main,
    },
    notSupport: {
      alignItems: 'center',
      background: color.general.soft,
      border: `1px solid ${color.primary.main}`,
      borderRadius: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      height: 290,
      justifyContent: 'center',
      textAlign: 'center',
    },
    root: {
      width: '100%',
      maxHeight: '100%',
      position: 'relative',
      overflow: 'auto',
    },
  }))();
};

export default useStyles;
