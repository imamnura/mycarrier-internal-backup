import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    box: {
      alignItems: 'center',
      display: 'flex',
      marginTop: '4px',
    },
    container: {
      position: 'relative',
      width: '100%',
    },
    containerChild: {
      marginLeft: 44,
      width: 'auto',
    },
    containerDragging: {
      background: color.white,
      zIndex: 8,
    },
    contentContainer: {
      flexGrow: 1,
      marginLeft: 16,
    },
    line: {
      background: color.general.light,
      left: 98,
      marginTop: 8,
      position: 'absolute',
      width: 1,
      zIndex: 9,
    },
    marginTop4: {
      marginTop: 4,
    },
    node: {
      '& > div': {
        background: color.general.light,
        borderRadius: '100%',
        height: 13,
        marginTop: 4,
        minWidth: 13,
        width: 13,
      },
      display: 'flex',
      height: 40,
      marginLeft: 24,
      position: 'relative',
    },
    parent: {
      alignItems: 'center',
      display: 'flex',
      paddingBottom: 8,
    },
  }))();
};

export default useStyles;
