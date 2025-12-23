import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, TextField } from '@material-ui/core';
import useStyles from '../../styles';
import MomentUtils from '@material-ui/pickers/adapter/moment';
import {
  LocalizationProvider,
  StaticDateRangePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import Typography from '@components/Typography';
import Button from '@components/Button';
import clsx from 'clsx';
import useResponsive from '@utils/hooks/useResponsive';
import useActions from './hooks/useActions';
import ArrowDown from '@assets/icon-v2/ArrowDown';
import DateIcon from '@assets/icon-v2/Date';
import color from '@styles/color';

export const KeyboardInput = (startProps, endProps) => (
  <React.Fragment>
    <TextField {...startProps} size="small" variant="standard" />
    <Box p={2}>
      <Typography children="TO" variant="caption" weight="bold" />
    </Box>
    <TextField {...endProps} size="small" variant="standard" />
  </React.Fragment>
);

const suggestion = [
  {
    date: [moment().add(-7, 'days'), moment()],
    label: 'Last Week',
  },
  {
    date: [moment().add(-1, 'month'), moment()],
    label: 'Last Month',
  },
  {
    date: [moment().add(-3, 'month'), moment()],
    label: 'Last 3 Month',
  },
  {
    date: [moment().add(-6, 'month'), moment()],
    label: 'Last 6 Month',
  },
  {
    date: [moment().startOf('year'), moment()],
    label: 'YTD',
  },
  {
    date: [moment().startOf('month'), moment()],
    label: 'MTD',
  },
  {
    date: [moment().add(-1, 'year'), moment()],
    label: 'Last Year',
  },
];

/**
 *
 * @typedef {import('@material-ui/pickers').StaticDateRangePickerProps} DateRangePickerProps -n
 *
 * @param {DateRangePickerProps} props -n
 * @returns {React.FC} -n
 */

const DateRangePickerPrimary = (props) => {
  const {
    onChange,
    value,
    label: _label,
    inputFormat,
    required,
    labelText,
    error,
    withIcon,
    fullWidth,
    id = 'date-range-picker',
    ...otherProps
  } = props;

  const mobileClient = useResponsive('xs');

  const {
    dateRangeEqual,
    label,
    onClosePopup,
    onSubmit,
    open,
    PopUp,
    resetSelectedDate,
    selectedDate,
    setOpen,
    setSelectedDate,
    setSuggestionSelectedDate,
  } = useActions({
    mobileClient,
    onChange,
    value,
    label: _label,
    inputFormat,
  });

  const classes = useStyles({ mobileClient, open, error, fullWidth });

  const popUpProps = mobileClient
    ? {
        classes: { paper: classes.dialogPaper },
        onClose: onClosePopup,
        open: !!open,
      }
    : {
        anchorEl: open,
        anchorOrigin: {
          horizontal: 'left',
          vertical: 'bottom',
        },
        onClose: onClosePopup,
        open: !!open,
        transformOrigin: {
          horizontal: 'left',
          vertical: 'top',
        },
      };

  return (
    <>
      {required && (
        <Typography
          children="*"
          className={classes.required}
          color="primary-main"
          variant="overline"
          weight="medium"
        />
      )}
      {labelText && (
        <Typography
          children={labelText}
          className={classes.label}
          variant="overline"
          weight="medium"
        />
      )}
      <div className={classes.dropdown} id={id} onClick={setOpen(true)}>
        {withIcon && (
          <DateIcon
            style={{
              color: color.general.main,
              height: 16,
              width: 16,
              marginRight: 8,
            }}
          />
        )}
        <Typography children={label} variant="body1" />
        <ArrowDown className="arrow" />
      </div>
      <PopUp id="popUp" {...popUpProps}>
        <LocalizationProvider dateAdapter={MomentUtils} locale="en-US">
          <StaticDateRangePicker
            {...otherProps}
            allowKeyboardControl={false}
            displayStaticWrapperAs={mobileClient ? 'mobile' : 'desktop'}
            inputFormat={inputFormat}
            onChange={setSelectedDate}
            renderInput={KeyboardInput}
            showToolbar={false}
            value={selectedDate}
          />
          <div className={classes.suggestionRoot}>
            <Grid container justifyContent="center">
              {suggestion.map((suggestItem, s) => {
                return (
                  <Grid item key={suggestItem.label} xs="auto">
                    <div
                      className={clsx({
                        [classes.suggestion]: true,
                        [classes.suggestionActive]: dateRangeEqual(
                          suggestItem.date,
                        ),
                      })}
                      id={`suggestion-${s}`}
                      onClick={setSuggestionSelectedDate(suggestItem.date)}
                    >
                      <Typography
                        children={suggestItem.label}
                        variant="caption"
                        weight="bold"
                      />
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
          <div className={classes.actionButton}>
            <Button
              children="Reset"
              id="btn-reset"
              onClick={resetSelectedDate}
              variant="ghost"
            />
            <Button children="Submit" id="btn-submit" onClick={onSubmit} />
          </div>
        </LocalizationProvider>
      </PopUp>
    </>
  );
};

DateRangePickerPrimary.defaultProps = {
  error: false,
  inputFormat: 'DD/MM/YYYY',
  label: ['Start Date', 'End Date'],
  labelText: null,
  required: false,
  value: [null, null],
  withIcon: false,
};

DateRangePickerPrimary.propTypes = {
  error: PropTypes.bool,
  inputFormat: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  labelText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.array,
  withIcon: PropTypes.bool,
};

export default DateRangePickerPrimary;
