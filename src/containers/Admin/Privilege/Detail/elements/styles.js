import { makeStyles } from '@material-ui/core';
import color from '@styles/color';

const useStyles = () => {
  return makeStyles(() => ({
    accordionRoot: {
      color: color.general.main,
      boxShadow: 'none',
      // border: '1px solid blue',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    summaryRoot: {
      padding: '0px !important',
      minHeight: '36px !important',
      margin: '0px !important',
    },
    summaryContent: {
      margin: '0px !important',
    },
    arrow: {
      width: 16,
      height: 16,
      color: color.general.main,
    },
    detailsRoot: {
      margin: 0,
      padding: 0,
      paddingLeft: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    },
    checkbox: {
      width: 20,
      height: 20,
      color: color.general.soft,
    },
    checked: {
      width: 20,
      height: 20,
      color: color.general.general,
    },
  }))();
};

export default useStyles;
