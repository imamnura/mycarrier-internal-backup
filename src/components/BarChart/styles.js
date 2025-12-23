import { makeStyles } from '@material-ui/core';
import color from '../../styles/color';

export const theme = {
  fontFamily: 'Titillium Web',
  fontSize: 14,
  grid: {
    line: {
      stroke: '#D2DADE',
    },
  },
  labels: {
    text: {
      fontSize: 10,
    },
  },
  textColor: color.general.main,
};

const useStyles = () => {
  return makeStyles(() => ({
    leftLabel: {
      transform: 'rotate(-90deg) !important',
      width: '5%',
    },
    root: {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      width: '100%',
    },
    chart: {
      height: '100%',
      width: '95%',
    },
    tooltip: {
      alignItems: 'center',
      background: color.white,
      border: `1px solid ${color.general.soft}`,
      borderRadius: 2,
      boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
      display: 'flex',
      height: 24,
      padding: '0px 8px',
    },
  }))();
};

export default useStyles;
