import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseDateRangePicker from '../DateRangePickerForm';

/**
 * @typedef {import('@material-ui/pickers').DateRangePickerProps} DateRangePickerProps -n
 *
 * @param {DateRangePickerProps} props -n
 * @returns {React.FC} -n
 */

const DateRangePicker = (props) => {
  const { control, name, helperText, error, ...DateRangePickerProps } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value = [null, null], onChange } = field;
        const fieldProps = {
          onChange,
          value,
          error: !!fieldState?.error?.message || error,
          helperText: fieldState?.error?.message || helperText || '',
        };

        return (
          <BaseDateRangePicker {...DateRangePickerProps} {...fieldProps} />
        );
      }}
    />
  );
};

DateRangePicker.defaultProps = {
  endLabel: undefined,
  error: false,
  helperText: '',
  required: false,
  startLabel: undefined,
};

DateRangePicker.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  endLabel: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  startLabel: PropTypes.string,
};

export default DateRangePicker;
