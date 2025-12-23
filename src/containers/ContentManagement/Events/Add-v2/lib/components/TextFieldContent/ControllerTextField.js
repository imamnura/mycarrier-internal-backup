import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseTextField from './BaseTextField';

/**
 *
 * @typedef {import('@material-ui/core').TextFieldProps} TextFieldProps -n
 *
 * @param {TextFieldProps} props -n
 * @returns {React.FC} -n
 */

const ControllerTextField = (props) => {
  const { control, name, helperText, error, rules, ...textFieldProps } = props;

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
          value,
          error: !!fieldState?.error?.message || error,
          helperText: fieldState?.error?.message || helperText || '',
        };

        return <BaseTextField {...textFieldProps} {...fieldProps} />;
      }}
      rules={rules}
    />
  );
};

ControllerTextField.defaultProps = {
  error: false,
  helperText: '',
  rules: undefined,
};

ControllerTextField.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
};

export default ControllerTextField;
