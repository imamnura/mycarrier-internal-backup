import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseDatePicker from '../DatePickerForm';

/**
 * @typedef {import('@material-ui/pickers').DatePickerProps} DatePickerProps -n
 *
 * @param {DatePickerProps} props -n
 * @returns {React.FC} -n
 */

const DatePicker = (props) => {
  const { control, name, helperText, error, ...DatePickerProps } = props;

  return (
    !!control && (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const { value = null, onChange } = field;
          const fieldProps = {
            onChange,
            value,
            error: !!fieldState?.error?.message || error,
            helperText: fieldState?.error?.message || helperText || '',
          };

          return <BaseDatePicker {...DatePickerProps} {...fieldProps} />;
        }}
      />
    )
  );
};

DatePicker.defaultProps = {
  endLabel: undefined,
  error: false,
  helperText: '',
  required: false,
  startLabel: undefined,
};

DatePicker.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  endLabel: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  startLabel: PropTypes.string,
};

export default DatePicker;
