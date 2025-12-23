import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Switch as BaseSwitch } from '@legion-ui/core';

const Switch = (props) => {
  const {
    control,
    name,
    helperText,
    error,
    rules,
    defaultValue,
    shouldUnregister,
    ...switchProps
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
          checked: value,
        };

        return <BaseSwitch {...switchProps} {...fieldProps} />;
      }}
      rules={rules}
      shouldUnregister={!!shouldUnregister}
    />
  );
};

Switch.defaultProps = {
  defaultValue: undefined,
  disabled: false,
  error: false,
  helperText: '',
  rules: undefined,
  shouldUnregister: false,
};

Switch.propTypes = {
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

export default Switch;
