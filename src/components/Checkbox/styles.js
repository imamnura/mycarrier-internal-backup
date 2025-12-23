import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';
import { importantCss } from '../../utils/common';

const useStyles = () => {
  return makeStyles(() => ({
    disabled: {
      color: importantCss(color.general.light),
    },
    icon: {
      height: 16,
      width: 16,
    },
    main: {
      color: importantCss(color.general.main),
    },
    root: {
      color: color.general.mid,
      padding: 0,
    },
  }))();
};

export default useStyles;
