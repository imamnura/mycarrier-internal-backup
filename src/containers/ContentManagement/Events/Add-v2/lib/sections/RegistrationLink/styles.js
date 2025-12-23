import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = (previewMode) => {
  return makeStyles(() => ({
    root: {
      border: previewMode ? 'none' : `2px dashed ${color.general.soft}`,
      padding: '4rem 0 2.5rem',
      position: 'relative',
    },
  }))();
};

export default useStyles;
