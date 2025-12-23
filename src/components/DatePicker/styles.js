import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = ({ disabled, error, mobileClient, open, fullWidth }) => {
  let colorHelper = color.general.main;
  let state = disabled ? 'disabled' : 'active';

  const variant = {
    disabled: {
      background: color.general.soft,
    },
    active: {
      '&:hover': {
        background: color.primary.soft,
      },
      background: open ? color.primary.soft : 'transparent',
      cursor: 'pointer',
    },
  };

  const width = {
    true: {
      width: '100%',
    },
    false: {
      maxWidth: 'max-content',
    },
  };

  if (error) {
    colorHelper = color.primary.main;
  }

  return makeStyles(() => ({
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      height: 70,
      borderTop: `1px solid ${color.general.light}`,
    },
    dialogPaper: {
      margin: 0,
      maxWidth: mobileClient ? 320 : 640,
    },
    dropdown: {
      ...variant[state],
      ...width[fullWidth],
      '& .arrow': {
        height: 16,
        marginLeft: 16,
        // transform: open ? 'rotate(-180deg)' : 'rotate(0)',
        transition: '200ms',
        width: 16,
      },
      alignItems: 'center',
      border: '1px solid #B1B5BA',
      borderRadius: 4,
      display: 'flex',
      height: 43,
      justifyContent: 'space-between',
      padding: '0px 16px',
    },
    helper: {
      alignItems: 'center',
      color: `${colorHelper} !important`,
      display: 'flex',
      justifyContent: 'space-between',
      minHeight: 18,
      paddingTop: 4,
      textAlign: 'left',
      width: '100%',
    },
    menuLabel: {
      color: `${colorHelper} !important`,
    },
  }))();
};

export default useStyles;
