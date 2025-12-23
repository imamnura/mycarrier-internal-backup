import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = (previewMode) => {
  return makeStyles(() => ({
    root: {
      border: previewMode ? 'none' : `2px dashed ${color.general.soft}`,
      marginTop: '2.5rem',
      position: 'relative',
    },
    wrapper: {
      position: 'relative',
      backgroundColor: color.general.soft,
    },
  }))();
};

export default useStyles;
