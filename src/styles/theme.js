import { createTheme } from '@material-ui/core';
import color from './color';
import muiPickerTheme from './muiPickerTheme';

export const defaultTheme = {
  color: {
    ...color,
    contrastText: 'red',
  },
  flex: {
    alignItems: 'center',
    display: 'flex',
  },
  overrides: {
    ...muiPickerTheme,
    MuiTab: {
      root: {
        minWidth: '0px !important',
      },
    },
    MuiCssBaseline: {
      '@global': {
        body: {
          color: color.general.main,
          paddingRight: '0px !important',
          // lineHeight: 0,
        },
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: color.general.light,
      },
    },
    MuiPopover: {
      paper: {
        borderRadius: 8,
        filter: 'drop-shadow(0px 6px 9px rgba(46, 67, 77, 0.08))',
        boxShadow: 'none',
      },
    },
    MuiPaper: {
      elevation8: {
        borderRadius: 8,
        filter: 'drop-shadow(0px 6px 9px rgba(46, 67, 77, 0.08))',
        boxShadow: 'none',
        overflow: 'auto',
      },
    },
  },
  page: {
    '@keyframes load': {
      to: {
        transform: 'rotate(360deg)',
      },
    },
    refreshIcon: {
      fontSize: 16,
      marginRight: 10,
    },
    rotate: {
      animation: '$load steps(100, end) 0.7s infinite',
    },
    tableText: {
      textOverflow: 'ellipsis',
      textTransform: 'capitalize',
      whiteSpace: 'nowrap',
    },
  },
  paper: {
    boxShadow: '0px 6px 9px rgba(46, 67, 77, 0.08)',
  },
  typography: {
    color: color.general.main,
    fontFamily: 'Titillium Web',
    fontSize: 14,
  },
  palette: {
    primary: {
      main: color.primary.main,
    },
  },
};

const theme = createTheme(defaultTheme);

export default theme;
