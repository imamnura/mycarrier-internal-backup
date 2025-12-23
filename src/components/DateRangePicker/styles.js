import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

const useStyles = ({ mobileClient, open, error, fullWidth }) => {
  // let colorHelper = color.general.main;
  let colorLabel = color.general.mid;

  if (open) {
    colorLabel = color.general.main;
  }

  if (error) {
    // colorHelper = color.primary.main;
    colorLabel = color.primary.main;
  }

  return makeStyles(() => ({
    actionButton: {
      alignItems: 'center',
      borderTop: `1px solid ${color.general.light}`,
      display: 'flex',
      gap: 16,
      height: 70,
      justifyContent: 'center',
    },
    dialogPaper: {
      borderRadius: 8,
      filter: 'drop-shadow(0px 6px 9px rgba(46, 67, 77, 0.08))',
      margin: 0,
      maxWidth: mobileClient ? 320 : 640,
    },
    dropdown: {
      '& .arrow': {
        height: 16,
        marginLeft: 16,
        // transform: open ? 'rotate(-180deg)' : 'rotate(0)',
        transition: '200ms',
        width: 16,
      },
      '&:hover': {
        background: color.primary.soft,
      },
      alignItems: 'center',
      background: open ? color.primary.soft : 'transparent',
      border: '1px solid #B1B5BA',
      borderRadius: 4,
      cursor: 'pointer',
      display: 'flex',
      height: 43,
      justifyContent: 'space-between',
      maxWidth: fullWidth ? '100%' : 'max-content',
      padding: '0px 16px',
      width: fullWidth ? '100%' : 'auto',
    },
    header: {
      alignItems: 'center',
      background: color.general.main,
      display: 'flex',
      justifyContent: 'center',
      padding: '8px 16px',
    },
    suggestion: {
      '&:hover': {
        background: color.primary.soft,
      },
      alignItems: 'center',
      border: `1px solid ${color.general.main}`,
      borderRadius: 4,
      boxSizing: 'border-box',
      color: color.general.main,
      cursor: 'pointer',
      display: 'flex',
      height: 24,
      margin: 2,
      padding: '0px 5px',
      textTransform: 'uppercase',
      transition: '200ms',
    },
    suggestionActive: {
      background: color.primary.soft,
      border: `1px solid ${color.primary.main}`,
      color: color.primary.main,
    },
    suggestionRoot: {
      borderTop: `1px solid ${color.general.light}`,
      padding: 16,
    },
    wrapperAction: {
      alignItems: 'center',
      display: mobileClient ? 'block' : 'flex',
      margin: 16,
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
