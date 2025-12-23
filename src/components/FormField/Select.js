import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseSelect from '../Select';

/**
 * @description for react-select props information
 *
 * @see {@link https://react-select.com/props}
 *
 * @typedef {import('react-select').Props} SelectProps -n
 *
 * @param {SelectProps} props -n
 * @returns {React.FC} -n
 */

const Select = (props) => {
  const {
    control,
    rules,
    shouldUnregister,
    name,
    helperText,
    error,
    customOnChange,
    defaultValue,
    ...SelectProps
  } = props;

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field, fieldState }) => {
        const { value = '', onChange, onBlur, name } = field;

        const handleChange = (selectedOption) => {
          onChange(selectedOption);
          if (customOnChange) {
            customOnChange(selectedOption);
          }
        };

        const fieldProps = {
          name,
          onBlur,
          onChange: handleChange,
          value: value ?? defaultValue,
          error: !!fieldState?.error?.message || error,
          helperText: fieldState?.error?.message || helperText || '',
        };

        return <BaseSelect {...SelectProps} {...fieldProps} />;
      }}
      rules={rules}
      shouldUnregister={!!shouldUnregister}
    />
  );
};

Select.defaultProps = {
  customOnChange: undefined,
  defaultValue: undefined,
  error: false,
  helperText: '',
  label: '',
  required: false,
  rules: undefined,
  shouldUnregister: false,
};

Select.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  customOnChange: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  defaultValue: PropTypes.any,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  rules: PropTypes.object,
  shouldUnregister: PropTypes.bool,
};

export default Select;
