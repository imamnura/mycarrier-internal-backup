import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    content: {
      maxHeight: 400,
      overflowY: 'auto',
      padding: '32px 40px',
      paddingLeft: 68,
    },
    detail: {
      '& p': {
        marginBlockEnd: 0,
        marginBlockStart: 2,
      },
      '& ul': {
        marginBlockStart: 0,
        paddingInlineStart: 32,
      },
      color: color.general.main,
      fontSize: 16,
      fontWeight: 300,
      lineHeight: '19px',
      paddingTop: 16,
    },
    footer: {
      alignItems: 'center',
      borderTop: `1px solid ${color.general.soft}`,
      boxSizing: 'border-box',
      display: 'flex',
      height: 102,
      justifyContent: 'center',
    },
    header: {
      borderBottom: `1px solid ${color.general.soft}`,
      boxSizing: 'border-box',
      paddingBottom: 32,
      paddingTop: 32,
      textAlign: 'center',
    },
    root: {
      borderRadius: 16,
      maxWidth: 720,
    },
    title: {
      '& .dot': {
        backgroundColor: color.primary.main,
        borderRadius: '100%',
        marginRight: 16,
        minHeight: 12,
        minWidth: 12,
      },
      alignItems: 'center',
      display: 'flex',
      marginLeft: -28,
    },
  }))();
};

export default useStyles;
