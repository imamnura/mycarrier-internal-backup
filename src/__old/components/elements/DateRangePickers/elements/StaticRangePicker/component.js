import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@material-ui/pickers/adapter/moment';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import {
  LocalizationProvider,
  StaticDateRangePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import { noop } from '../../../../../utils/common';
import Button from '../../../Button';

const Component = (props) => {
  const { classes, value, onChange, fullDate } = props;

  const [selectedDate, setSelectedDate] = React.useState(value || [null, null]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#DE1B1B',
      },
    },
    typography: {
      fontFamily: 'Titillium Web',
      color: '#3B525C',
    },
  });

  const compareDate = (date) => {
    const first =
      moment(selectedDate[0]).format('DD-MM-YYYY') ===
      date[0].format('DD-MM-YYYY');
    const second =
      moment(selectedDate[1]).format('DD-MM-YYYY') ===
      date[1].format('DD-MM-YYYY');

    return first && second;
  };

  const suggestion = [
    {
      label: 'Last Week',
      date: [moment().add(-7, 'days'), moment()],
    },
    {
      label: 'Last Month',
      date: [moment().add(-1, 'month'), moment()],
    },
    {
      label: 'Last 3 Month',
      date: [moment().add(-3, 'month'), moment()],
    },
    {
      label: 'Last Year',
      date: [moment().add(-1, 'year'), moment()],
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={MomentUtils} locale="en-US">
        <Grid container>
          {!fullDate && (
            <Grid className={classes.suggestWrapper} item>
              <div className={classes.suggestMenu}>
                {suggestion.map(({ label, date }) => (
                  <div
                    className={clsx(classes.suggestItem, {
                      [classes.suggestItemActive]: compareDate(date),
                    })}
                    key={label}
                    onClick={() => handleDateChange(date)}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </Grid>
          )}
          <Grid item>
            <div className={classes.calendarWrapper}>
              <StaticDateRangePicker
                className={props.classes.root}
                disableFuture={!fullDate}
                displayStaticWrapperAs="desktop"
                onChange={handleDateChange}
                value={selectedDate}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid align="right" item xs={12}>
            <Button
              children="Clear"
              onClick={() => {
                handleDateChange([]);
                props.onClose();
              }}
              variant="ghost"
            />
            &nbsp;&nbsp;
            <Button children="Submit" onClick={props.onClose} />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

Component.propTypes = {
  classes: PropTypes.object,
  fullDate: PropTypes.bool,
  onChange: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  value: PropTypes.array,
};

Component.defaultProps = {
  classes: {},
  fullDate: false,
  onChange: noop,
  value: [null, null],
};

export default Component;
