import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseTimePicker from '../TimePickerForm';

/**
 * @typedef {import('@material-ui/pickers').TimePickerProps} TimePickerProps -n
 *
 * @param {TimePickerProps} props -n
 * @returns {React.FC} -n
 */

const TimePicker = (props) => {
  const { control, name, helperText, error, ...TimePickerProps } = props;

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

          return <BaseTimePicker {...TimePickerProps} {...fieldProps} />;
        }}
      />
    )
  );
};

TimePicker.defaultProps = {
  endLabel: undefined,
  error: false,
  helperText: '',
  required: false,
  startLabel: undefined,
};

TimePicker.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  endLabel: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  startLabel: PropTypes.string,
};

export default TimePicker;
