import React from 'react';
import PropTypes from 'prop-types';
import MomentUtils from '@material-ui/pickers/adapter/moment';
import { DateTimePicker, LocalizationProvider } from '@material-ui/pickers';
import TextField from '../TextField';
import DateIcon from '../../assets/icon-v2/Date';
import moment from 'moment';
import color from '@styles/color';

/**
 *
 * @typedef {import('@material-ui/pickers').DateTimePickerProps} DateTimePickerProps -n
 *
 * @param {DateTimePickerProps} props -n
 * @returns {React.FC} -n
 */

const DateTimePickerForm = (props) => {
  const {
    error,
    helperText,
    onChange: _onChange,
    required,
    value,
    label,
    disabled,
    ...pickerProps
  } = props;

  const onChange = (val) => {
    _onChange(val ? moment(val).toJSON() : undefined);
  };

  return (
    <LocalizationProvider dateAdapter={MomentUtils} locale="en-US">
      <DateTimePicker
        {...pickerProps}
        ampm={false}
        autoOk
        disabled={disabled}
        inputFormat="DD/MM/YYYY HH:mm"
        label={label}
        onChange={onChange}
        openPickerIcon={
          <DateIcon
            style={{
              color: disabled ? color.general.light : color.general.main,
              height: 16,
              width: 16,
            }}
          />
        }
        renderInput={(TextFieldProps) => (
          <TextField
            {...TextFieldProps}
            error={error}
            helperText={helperText}
            inputProps={{
              ...TextFieldProps.inputProps,
              placeholder: 'DD/MM/YYYY HH:mm',
            }}
            required={required}
          />
        )}
        showDaysOutsideCurrentMonth
        showToolbar={false}
        value={value}
      />
    </LocalizationProvider>
  );
};

DateTimePickerForm.defaultProps = {
  disabled: false,
  error: false,
  helperText: '',
  label: 'Start Date',
  required: false,
  value: null,
};

DateTimePickerForm.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.array,
};

export default DateTimePickerForm;
