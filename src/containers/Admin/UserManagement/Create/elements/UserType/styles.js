import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    optionUserType: {
      transition: '200ms',
      height: '100%',
      width: '100%',
      padding: 24,
      border: `1px solid ${color.general.light}`,
      borderRadius: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      cursor: 'pointer',
      borderSizing: 'border-box',
      userSelect: 'none',
      '&:hover': {
        border: `1px solid ${color.primary.soft}`,
        background: color.primary.soft,
      },
    },
    optionUserTypeSelected: {
      border: `1px solid ${color.primary.soft}`,
      background: color.primary.soft,
    },
  }))();
};

export default useStyles;
