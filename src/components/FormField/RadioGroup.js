import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseRadioGroup from '../RadioGroup';

const RadioGroup = (props) => {
  const {
    control,
    name,
    helperText,
    error,
    shouldUnregister,
    rules,
    ...radioGroupProps
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value = '', onChange, name } = field;
        const fieldProps = {
          name,
          onChange,
          value,
          error: !!fieldState?.error?.message || error,
          helperText: fieldState?.error?.message || helperText || '',
        };

        return <BaseRadioGroup {...radioGroupProps} {...fieldProps} />;
      }}
      rules={rules}
      shouldUnregister={!!shouldUnregister}
    />
  );
};

RadioGroup.defaultProps = {
  error: false,
  helperText: '',
  rules: undefined,
  shouldUnregister: false,
};

RadioGroup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  shouldUnregister: PropTypes.bool,
};

export default RadioGroup;
