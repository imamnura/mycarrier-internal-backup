import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      width: 432,
      maxWidth: 'calc(100% - 80px)',
      maxHeight: '479px',
      padding: '32px 40px',
      overflowY: 'visible',
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
    },
    notFound: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      textAlign: 'center',
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
      border: `1px solid ${color.general.light}`,
      borderRadius: 8,
      boxSizing: 'border-box',
      cursor: 'pointer',
      padding: 16,
      transition: '200ms',
      width: '100%',
    },
    optionContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      overflow: 'scroll',
      paddingTop: '14px',
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
