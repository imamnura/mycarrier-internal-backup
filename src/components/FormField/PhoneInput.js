import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseTextField from '../TextField';

/**
 *
 * @typedef {import('@material-ui/core').TextFieldProps} TextFieldProps -n
 *
 * @param {TextFieldProps} props -n
 * @returns {React.FC} -n
 */

const PhoneInput = (props) => {
  const { control, name, helperText, error, ...textFieldProps } = props;

  const format62Number = (str) => {
    let result = str;
    if (result.indexOf('0') === 0) {
      result = result.replace('0', '+62');
    }
    result = result.replace(/[a-zA-Z]/g, '');
    return result;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value = '', onChange, onBlur, name } = field;
        const fieldProps = {
          name,
          onBlur,
          onChange,
          value: format62Number(value),
          error: !!fieldState?.error?.message || error,
          helperText: fieldState?.error?.message || helperText || '',
        };

        return <BaseTextField {...textFieldProps} {...fieldProps} />;
      }}
    />
  );
};

PhoneInput.defaultProps = {
  error: false,
  helperText: '',
};

PhoneInput.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default PhoneInput;
