import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = ({ disabled, error }) => {
  let helperColor = color.general.mid;
  let labelColor = color.general.main;

  if (disabled) {
    helperColor = color.general.light;
    labelColor = color.general.light;
  }

  if (error) {
    helperColor = color.primary.main;
    labelColor = color.primary.main;
  }

  return makeStyles(() => ({
    container: {
      marginTop: 8,
    },
    disabled: {
      background: color.general.soft,
    },
    error: {
      borderColor: `${color.primary.main} !important`,
    },
    helper: {
      alignItems: 'center',
      color: helperColor,
      display: 'flex',
      justifyContent: 'space-between',
      minHeight: 18,
      paddingTop: 4,
      textAlign: 'left',
      width: '100%',
    },
    input: {
      '&:focus-visible': {
        border: `1px solid ${color.general.main}`,
        outline: 'none',
      },
      border: `1px solid ${color.general.light}`,
      borderRadius: 8,
      boxSizing: 'border-box',
      height: 32,
      marginRight: 8,
      minWidth: 32,
      transition: '200ms',
      width: 32,
    },
    label: {
      color: `${labelColor} !important`,
    },
    required: {
      marginRight: 2,
    },
  }))();
};

export default useStyles;
