import color from './color';

const muiPickerTheme = {
  MuiPickersArrowSwitcher: {
    iconButton: {
      '&:hover': {
        backgroundColor: color.primary.main,
      },
      backgroundColor: color.primary.main,
      color: color.white,
    },
  },
  MuiPickersBasePicker: {
    pickerView: {
      maxHeight: 298,
      padding: 0,
      width: 280,
    },
    pickerViewLandscape: {
      padding: 0,
      width: 280,
    },
  },
  MuiPickersCalendar: {
    calendarContainer: {
      minHeight: 212,
    },
    daysHeader: {
      backgroundColor: color.primary.main,
      height: 24,
      paddingBottom: 16,
      paddingTop: 8,
    },
    week: {
      marginTop: 8,
    },
    weekDayLabel: {
      color: color.white,
      fontWeight: 500,
      height: 24,
      width: 33,
    },
  },
  MuiPickersCalendarHeader: {
    switchHeader: {
      backgroundColor: color.primary.main,
      color: color.white,
      marginBottom: 0,
      marginTop: 0,
      maxHeight: 'none',
      minHeight: 56,
      paddingBottom: 8,
      paddingTop: 8,
    },
    switchViewDropdown: {
      color: color.white,
    },
  },
  MuiPickersCalendarView: {
    viewTransitionContainer: {
      // maxHeight: 212
    },
  },
  MuiPickersClock: {
    clock: {
      marginTop: 20,
    },
    container: {
      minHeight: 298,
    },
  },
  MuiPickersClockView: {
    arrowSwitcher: {
      minHeight: 200,
    },
  },
  MuiPickersDateRangeDay: {
    rangeIntervalDay: {
      '&:first-child': {
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
      },
      '&:last-child': {
        borderBottomRightRadius: 4,
        borderTopRightRadius: 4,
      },
    },
    rangeIntervalDayHighlight: {
      '&:first-child': {
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
      },
      '&:last-child': {
        borderBottomRightRadius: 4,
        borderTopRightRadius: 4,
      },
    },
    rangeIntervalDayHighlightEnd: {
      borderBottomRightRadius: 4,
      borderTopRightRadius: 4,
    },
    rangeIntervalDayHighlightStart: {
      borderBottomLeftRadius: 4,
      borderTopLeftRadius: 4,
    },
    rangeIntervalDayPreview: {
      borderRadius: '4px !important',
    },
  },
  MuiPickersDay: {
    day: {
      '&:hover': {
        backgroundColor: color.primary.soft,
      },
      borderRadius: 4,
      height: 26,
      width: 33,
    },
    dayDisabled: {
      color: color.general.soft,
    },
    dayOutsideMonth: {
      color: color.general.mid,
    },
  },
  MuiPickersDesktopDateRangeCalendar: {
    arrowSwitcher: {
      backgroundColor: color.primary.main,
      color: color.white,
    },
    calendar: {
      minHeight: 240,
    },
    rangeCalendarContainer: {
      '&:not(:last-child)': {
        borderRight: 0,
      },
    },
  },
  MuiPickersMonth: {
    monthSelected: {
      '&:hover': {
        backgroundColor: color.primary.main,
        color: `${color.white} !important`,
      },
      background: color.primary.main,
      color: `${color.white} !important`,
    },
    root: {
      '&:hover': {
        backgroundColor: color.primary.soft,
        color: color.general.main,
      },
      borderRadius: 4,
      fontSize: 14,
      fontWeight: 400,
      height: 38,
      letterSpacing: '0.0025em',
      marginBottom: 4,
    },
  },
  MuiPickersMonthSelection: {
    container: {
      padding: 16,
      width: 280,
    },
  },
  MuiPickersStaticWrapper: {
    staticWrapperRoot: {
      minWidth: 280,
    },
  },
  MuiPickersYear: {
    yearButton: {
      '&:hover': {
        backgroundColor: color.primary.soft,
        color: color.general.main,
      },
      borderRadius: 4,
      fontSize: 14,
      fontWeight: 400,
      height: '100%',
      letterSpacing: '0.0025em',
      width: '100%',
    },
    yearButtonContainer: {
      height: 38,
      marginBottom: 4,
      padding: 0,
      width: 77,
    },
    yearButtonContainerDesktop: {
      flexBasis: '33.3%',
    },
    yearSelected: {
      '&:hover': {
        backgroundColor: color.primary.main,
        color: color.white,
      },
    },
  },
  MuiPickersYearSelection: {
    container: {
      padding: 16,
    },
  },
  MuiTypography: {
    subtitle1: {
      fontFamily: 'Titillium Web',
      fontSize: 16,
      fontWeight: 700,
    },
  },
};

export default muiPickerTheme;
