import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseCheckbox from '../Checkbox';

/**
 *
 * @typedef {import('@material-ui/core').CheckboxProps} CheckboxProps -n
 *
 * @param {CheckboxProps} props -n
 * @returns {React.FC} -n
 */

const Checkbox = (props) => {
  const {
    control,
    rules,
    shouldUnregister,
    name,
    helperText,
    error,
    ...CheckboxProps
  } = props;

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
          checked: value,
          error: !!fieldState?.error?.message || error,
          helperText: fieldState?.error?.message || helperText || '',
        };

        return <BaseCheckbox {...CheckboxProps} {...fieldProps} />;
      }}
      rules={rules}
      shouldUnregister={!!shouldUnregister}
    />
  );
};

Checkbox.defaultProps = {
  error: false,
  helperText: '',
  label: '',
  required: false,
  rules: undefined,
  shouldUnregister: false,
};

Checkbox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  rules: PropTypes.object,
  shouldUnregister: PropTypes.bool,
};

export default Checkbox;
