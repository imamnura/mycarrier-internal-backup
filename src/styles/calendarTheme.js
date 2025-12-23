import { createTheme } from '@material-ui/core';
import color from './color';
import { importantCss } from '@utils/common';
import { defaultTheme } from './theme';

const calendarTheme = ({ isMobile }) =>
  createTheme({
    ...defaultTheme,
    overrides: {
      ...defaultTheme.overrides,
      MuiPickersArrowSwitcher: {
        iconButton: {
          '&:hover': {
            color: color.general.dark,
          },
          backgroundColor: color.white,
          color: color.general.main,
        },
      },
      MuiPickersStaticWrapper: {
        staticWrapperRoot: {
          minWidth: isMobile ? '' : 400,
        },
      },
      MuiPickersBasePicker: {
        pickerView: {
          // maxHeight: 298,
          padding: 0,
          width: isMobile ? '100%' : 400,
        },
        pickerViewLandscape: {
          padding: 0,
        },
      },
      MuiPickersCalendar: {
        calendarContainer: {
          minHeight: 240,
        },
        daysHeader: {
          backgroundColor: color.white,
          color: color.general.main,
          height: 24,
          padding: 16,
          paddingBottom: 24,
          justifyContent: 'space-between',
          borderBottom: `1px solid ${color.general.light}`,
        },
        week: {
          marginTop: 8,
          padding: '0px 16px',
          justifyContent: 'space-between',
          marginBottom: 12,
        },
        weekDayLabel: {
          color: color.general.main,
          fontWeight: 500,
          height: 24,
          width: 33,
        },
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          backgroundColor: color.white,
          color: color.general.main,
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
          '&:first-child': {
            color: color.primary.main,
          },
          color: color.general.main,
          borderRadius: 4,
          height: 26,
          width: 33,
        },
        dayDisabled: {
          color: importantCss(color.general.soft),
        },
        dayOutsideMonth: {
          color: importantCss(color.general.mid),
        },
        daySelected: {
          color: importantCss(color.white),
          fontWeight: 400,
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
          width: 400,
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
    },
  });

export default calendarTheme;
