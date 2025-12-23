import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseOTPInput from '../OTPInput';

const OTPInput = (props) => {
  const { control, name, helperText, error, ...OTPInputProps } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value = '', onChange } = field;
        const fieldProps = {
          name,
          onChange,
          value,
          error: !!fieldState?.error?.message || error,
          helperText: fieldState?.error?.message || helperText || '',
        };

        return <BaseOTPInput {...OTPInputProps} {...fieldProps} />;
      }}
    />
  );
};

OTPInput.defaultProps = {
  disabled: false,
  error: false,
  helperText: '',
  label: '',
  required: false,
  value: '',
};

OTPInput.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default OTPInput;
