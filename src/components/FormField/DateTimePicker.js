import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseDateTimePicker from '../DateTimePickerForm';

/**
 * @typedef {import('@material-ui/pickers').DateTimePickerProps} DateTimePickerProps -n
 *
 * @param {DateTimePickerProps} props -n
 * @returns {React.FC} -n
 */

const DateTimePicker = (props) => {
  const { control, name, helperText, error, ...DateTimePickerProps } = props;

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

          return (
            <BaseDateTimePicker {...DateTimePickerProps} {...fieldProps} />
          );
        }}
      />
    )
  );
};

DateTimePicker.defaultProps = {
  endLabel: undefined,
  error: false,
  helperText: '',
  required: false,
  startLabel: undefined,
};

DateTimePicker.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  endLabel: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  startLabel: PropTypes.string,
};

export default DateTimePicker;
