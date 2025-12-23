import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  // let colorVariant = color.general.main;

  return makeStyles((theme) => ({
    root: {
      background: color.general.soft,
      borderRadius: '8px 8px 0 0',
      marginTop: '16px',
      height: '524px',
      minHeight: '300px',
      overflowY: 'auto',
      padding: '0 16px 16px 16px',
      '&::-webkit-scrollbar-thumb': {
        boxShadow: `inset 0 0 13px 13px ${color.general.light}`,
      },
      '&::-webkit-scrollbar-track': {
        border: 'none',
        margin: '8px',
      },
    },
    bottomContainer: {
      border: `1px solid ${color.general.soft}`,
      borderRadius: '0 0 8px 8px',
      minHeight: 'auto',
    },
    rootInput: {
      boxShadow: 'none',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      fontWeight: '400',
      lineHeight: '14px',
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }))();
};

export default useStyles;
