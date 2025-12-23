import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Textfield as BaseTextField, Text } from '@legion-ui/core';

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
          status: !!fieldState?.error?.message || error ? 'error' : 'normal',
          message: fieldState?.error?.message || helperText || '',
        };

        return (
          <BaseTextField
            {...textFieldProps}
            {...fieldProps}
            label={
              <Text size="sm" weight="600" block mb="8px" color="#3B525C">
                {textFieldProps?.required && (
                  <Text children="*" size="sm" color="#DE1B1B" />
                )}
                {textFieldProps?.label}
              </Text>
            }
          />
        );
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
