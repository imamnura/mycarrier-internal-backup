import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseTextFieldMasked from '../TextFieldMasked';

/**
 *
 * @typedef {import('@material-ui/core').TextFieldProps} TextFieldProps -n
 *
 * @param {TextFieldProps} props -n
 * @returns {React.FC} -n
 */

const TextFieldMasked = (props) => {
  const {
    control,
    name,
    helperText,
    error,
    rules,
    defaultValue,
    shouldUnregister,
    onCustomChange,
    ...textFieldProps
  } = props;

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field, fieldState }) => {
        const { value = '', onChange, onBlur, name } = field;

        const handleChange = (val) => {
          onChange(val);
          if (onCustomChange) {
            onCustomChange(val);
          }
        };

        const fieldProps = {
          name,
          onBlur,
          onChange: handleChange,
          value: value.toString(),
          error: !!fieldState?.error?.message || error,
          helperText: fieldState?.error?.message || helperText || '',
        };

        return <BaseTextFieldMasked {...textFieldProps} {...fieldProps} />;
      }}
      rules={rules}
      shouldUnregister={shouldUnregister}
    />
  );
};

TextFieldMasked.defaultProps = {
  defaultValue: '',
  error: false,
  helperText: '',
  onCustomChange: () => {},
  rules: undefined,
  shouldUnregister: false,
};

TextFieldMasked.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  defaultValue: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  onCustomChange: PropTypes.func,
  rules: PropTypes.object,
  shouldUnregister: PropTypes.bool,
};

export default TextFieldMasked;
