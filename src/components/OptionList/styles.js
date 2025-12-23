import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    icon: {
      height: 40,
      width: 40,
      color: color.general.light,
    },
    iconContainer: {
      marginRight: 24,
      minWidth: 80,
      height: 80,
      borderRadius: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px solid ${color.general.light}`,
      boxSizing: 'border-box',
    },
    iconContainerSelected: {
      background: color.white,
      borderColor: color.white,
    },
    iconSelected: {
      color: color.primary.main,
    },
    root: {
      alignItems: 'center',
      border: `1px solid ${color.general.light}`,
      borderRadius: 16,
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 16,
      padding: 24,
    },
    rootSelected: {
      background: color.primary.soft,
      borderColor: color.primary.soft,
    },
    selectedRedBorder: {
      background: color.primary.soft,
      border: `1px solid ${color.primary.main}`,
    },
  }))();
};

export default useStyles;
