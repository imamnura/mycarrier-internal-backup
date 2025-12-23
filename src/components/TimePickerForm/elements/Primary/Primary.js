import React from 'react';
import PropTypes from 'prop-types';
import MomentUtils from '@material-ui/pickers/adapter/moment';
import { TimePicker, LocalizationProvider } from '@material-ui/pickers';
import TextField from '../../../TextField';
import TimeIcon from '../../../../assets/icon-v2/Time';
import moment from 'moment';
import color from '@styles/color';

/**
 *
 * @typedef {import('@material-ui/pickers').TimePickerProps} TimePickerProps -n
 *
 * @param {TimePickerProps} props -n
 * @returns {React.FC} -n
 */

const TimePickerFormPrimary = (props) => {
  const {
    error,
    helperText,
    onChange: _onChange,
    required,
    value,
    label,
    maxTime,
    minTime,
    disabled,
  } = props;

  const onChange = (val) => {
    _onChange(val ? moment(val).toJSON() : undefined);
  };

  return (
    <LocalizationProvider dateAdapter={MomentUtils} locale="en-US">
      <TimePicker
        ampm={false}
        autoOk
        disabled={disabled}
        label={label}
        maxTime={maxTime}
        minTime={minTime}
        onChange={onChange}
        openPickerIcon={
          <TimeIcon
            style={{
              color: color.general.main,
              height: 16,
              width: 16,
            }}
          />
        }
        PopoverProps={{
          PaperProps: {
            variant: 'outlined',
            elevation: 0,
          },
        }}
        renderInput={(TextFieldProps) => (
          <TextField
            {...TextFieldProps}
            error={error}
            helperText={helperText}
            inputProps={{ ...TextFieldProps.inputProps }}
            required={required}
          />
        )}
        value={value || minTime}
      />
    </LocalizationProvider>
  );
};

TimePickerFormPrimary.defaultProps = {
  disabled: false,
  error: false,
  helperText: '',
  label: 'Select Date',
  maxTime: null,
  minTime: null,
  required: false,
  value: null,
};

TimePickerFormPrimary.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  maxTime: PropTypes.string,
  minTime: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default TimePickerFormPrimary;
