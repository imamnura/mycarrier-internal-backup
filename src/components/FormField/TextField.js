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

const TextField = (props) => {
  const {
    control,
    name,
    helperText,
    error,
    rules,
    defaultValue,
    shouldUnregister,
    ...textFieldProps
  } = props;

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
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
      shouldUnregister={!!shouldUnregister}
    />
  );
};

TextField.defaultProps = {
  defaultValue: undefined,
  disabled: false,
  error: false,
  helperText: '',
  rules: undefined,
  shouldUnregister: false,
};

TextField.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  shouldUnregister: PropTypes.bool,
};

export default TextField;
