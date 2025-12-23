import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = ({ alignItems, error, disabled, direction, focus }) => {
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
    icon: {
      color: `${colorLabel} !important`,
      marginTop: alignItems === 'flex-start' ? -9 : 0,
    },
    iconChecked: {
      color: `${color.general.main} !important`,
    },
    iconDisabled: {
      color: `${color.general.light} !important`,
    },
    label: {
      color: `${colorLabel} !important`,
      marginLeft: direction === 'vertical' ? 7 : 0,
      width: direction === 'vertical' ? '100%' : 'auto',
    },
    radioLabel: {
      color: `${color.general.main} !important`,
      marginLeft: direction === 'vertical' ? 7 : 0,
      width: direction === 'vertical' ? '100%' : 'auto',
    },
    labelRoot: {
      alignItems,
      width: direction === 'vertical' ? '100%' : 'auto',
      marginRight: direction === 'horizontal' ? 32 : 0,
    },
    required: {
      marginRight: 2,
    },
  }))();
};

export default useStyles;
