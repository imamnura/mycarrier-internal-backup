import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = ({ step }) => {
  return makeStyles(() => ({
    dialogRoot: {
      borderRadius: 16,
      padding: '32px 40px',
      width: step === 1 ? 1192 : 450,
    },
    actionDivider: {
      background: color.general.light,
      height: 24,
      marginLeft: 16,
      marginRight: 16,
      width: 1,
    },
    dashed: {
      border: `1px dashed ${color.general.light}`,
      width: '100%',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      textAlign: 'center',
      alignItems: 'center',
    },
  }))();
};

export default useStyles;
