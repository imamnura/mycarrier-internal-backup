import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = (isPopup, mobileClient) => {
  return makeStyles(() => ({
    notFound: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      justifyContent: 'center',
      padding: 24,
    },
    notFoundIcon: {
      height: 80,
      width: 80,
    },
    optionBottomContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    },
    optionBox: {
      '&:hover': {
        background: color.primary.soft,
      },
      border: `1px solid ${color.general.light}`,
      borderRadius: 8,
      boxSizing: 'border-box',
      cursor: 'pointer',
      padding: 16,
      transition: '200ms',
      width: isPopup || mobileClient ? '100%' : 500,
    },
    optionContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      maxHeight: isPopup ? 230 : 400,
      minHeight: isPopup ? 230 : 400,
      overflow: 'scroll',
      paddingRight: 16,
      paddingTop: 24,
      width: isPopup ? '100%' : 'calc(100% + 20px)',
    },
    optionSelected: {
      background: color.primary.soft,
      border: `1px solid ${color.primary.main}`,
    },
    optionTopContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
  }))();
};

export default useStyles;
