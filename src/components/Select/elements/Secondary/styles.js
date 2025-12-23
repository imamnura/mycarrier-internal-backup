import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

export const useSelectStyle = () => ({
  control: {
    '&:focus': {
      backgroundColor: color.white,
    },
    '&:hover': {
      backgroundColor: color.white,
    },
    backgroundColor: `transparent !important`,
    borderBottom: `1px solid ${color.general.main}`,
    borderRadius: 0,
    fontSize: 14,
    height: 28,
    minHeight: 28,
    padding: '0',
    position: 'relative',
  },
  placeholder: {
    fontSize: 14,
    visibility: 'hidden',
  },
});

const useStyles = ({ disabled, error, focus, shrink }) => {
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
    dropdownContainer: {
      marginTop: 16,
      position: 'absolute',
      zIndex: 2,
    },
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
    labelContainer: {
      left: 0,
      position: 'absolute',
      top: shrink ? 0 : 20,
      transform: shrink
        ? 'translate(-24px, 0) scale(0.715)'
        : 'translate(0, 0) scale(1)',
      transition: '200ms 0ms',
      zIndex: 1,
    },
    required: {
      marginRight: 2,
    },
    root: {
      marginTop: '-5px',
      position: 'relative',
    },
  }))();
};

export default useStyles;
