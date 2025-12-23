import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    helper: {
      alignItems: 'center',
      color: `${color.primary.main} `,
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: 4,
      textAlign: 'left',
      width: '100%',
    },
    root: {
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: '0.01em',
      lineHeight: '16px',
      padding: 0,
      color: `${color.general.main} !important`,
      '&::placeholder': {
        opacity: 1,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: '0.01em',
        lineHeight: '16px',
      },
    },
  }))();
};

export default useStyles;
