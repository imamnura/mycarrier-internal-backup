import React from 'react';
import PropTypes from 'prop-types';
import MomentUtils from '@material-ui/pickers/adapter/moment';
import { DateRangePicker, LocalizationProvider } from '@material-ui/pickers';
import TextField from '../TextField';
import DateIcon from '../../assets/icon-v2/Date';
import useResponsive from '../../utils/hooks/useResponsive';
import Typography from '../Typography';
import { Box } from '@material-ui/core';
import moment from 'moment';

/**
 *
 * @typedef {import('@material-ui/pickers').DateRangePickerProps} DateRangePickerProps -n
 *
 * @param {DateRangePickerProps} props -n
 * @returns {React.FC} -n
 */

const DateRangePickerForm = (props) => {
  const {
    endLabel,
    error,
    helperText,
    onChange: _onChange,
    required,
    startLabel,
    value,
    ...otherProps
  } = props;

  const mobileClient = useResponsive('xs');

  const onChange = (val) => {
    const formattedVal = val.map((v) => (v ? moment(v).toJSON() : null));
    _onChange(formattedVal);
  };

  return (
    <LocalizationProvider dateAdapter={MomentUtils} locale="en-US">
      <DateRangePicker
        calendars={mobileClient ? 1 : 2}
        inputFormat="DD/MM/YYYY"
        onChange={onChange}
        renderInput={(startProps, endProps) => {
          return (
            <Box alignItems="center" display="flex" width="100%">
              <Box width="100%">
                <TextField
                  error={error}
                  helperText={helperText}
                  inputProps={{
                    ...startProps.inputProps,
                    placeholder: 'DD/MM/YYYY',
                  }}
                  label={startLabel}
                  required={required}
                  rightAdornment={DateIcon}
                />
              </Box>
              <Box mx={2}>
                <Typography children="-" variant="subtitle2" weight="medium" />
              </Box>
              <Box width="100%">
                <TextField
                  error={error}
                  inputProps={{
                    ...endProps.inputProps,
                    placeholder: 'DD/MM/YYYY',
                  }}
                  label={endLabel}
                  required={required}
                  rightAdornment={DateIcon}
                />
              </Box>
            </Box>
          );
        }}
        value={value}
        {...otherProps}
      />
    </LocalizationProvider>
  );
};

DateRangePickerForm.defaultProps = {
  endLabel: 'End Date',
  error: false,
  helperText: '',
  required: false,
  startLabel: 'Start Date',
  value: [null, null],
};

DateRangePickerForm.propTypes = {
  endLabel: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  startLabel: PropTypes.string,
  value: PropTypes.array,
};

export default DateRangePickerForm;
