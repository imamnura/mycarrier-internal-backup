import React from 'react';
import PropTypes from 'prop-types';
import MomentUtils from '@material-ui/pickers/adapter/moment';
import { DatePicker, LocalizationProvider } from '@material-ui/pickers';
import TextField from '../TextField';
import DateIcon from '../../assets/icon-v2/Date';
import moment from 'moment';
import color from '@styles/color';

/**
 *
 * @typedef {import('@material-ui/pickers').DatePickerProps} DatePickerProps -n
 *
 * @param {DatePickerProps} props -n
 * @returns {React.FC} -n
 */

const DatePickerForm = (props) => {
  const {
    error,
    helperText,
    onChange: _onChange,
    required,
    value,
    label,
    minDate,
    formatDate,
    placeholder,
    disabled,
    ...otherProps
  } = props;

  const onChange = (val) => {
    _onChange(val ? moment(val).toJSON() : undefined);
  };

  return (
    <LocalizationProvider dateAdapter={MomentUtils} locale="en-US">
      <DatePicker
        autoOk
        disabled={disabled}
        inputFormat={formatDate}
        label={label}
        minDate={minDate}
        onChange={onChange}
        openPickerIcon={
          <DateIcon
            style={{
              color: color.general.main,
              height: 16,
              width: 16,
            }}
          />
        }
        reduceAnimations
        renderInput={(TextFieldProps) => (
          <TextField
            {...TextFieldProps}
            error={error}
            helperText={helperText}
            inputProps={{
              ...TextFieldProps.inputProps,
              placeholder: placeholder,
            }}
            required={required}
          />
        )}
        value={value}
        views={['year', 'date']}
        {...otherProps}
      />
    </LocalizationProvider>
  );
};

DatePickerForm.defaultProps = {
  disabled: false,
  error: false,
  formatDate: 'DD/MM/YYYY',
  helperText: '',
  label: 'Select Date',
  minDate: null,
  placeholder: 'DD/MM/YYYY',
  required: false,
  value: null,
};

DatePickerForm.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  formatDate: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  minDate: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.array,
};

export default DatePickerForm;
