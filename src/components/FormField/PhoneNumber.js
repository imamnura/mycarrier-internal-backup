import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BasePhoneNumber from '../PhoneNumber';

/**
 *
 * @typedef {import('@material-ui/core').TextFieldProps} TextFieldProps -n
 *
 * @param {TextFieldProps} props -n
 * @returns {React.FC} -n
 */

const PhoneNumber = (props) => {
  const {
    control,
    rules,
    shouldUnregister,
    name,
    helperText,
    error,
    ...PhoneNumberProps
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange, onBlur, name } = field;
        const fieldProps = {
          name,
          onBlur,
          onChange,
          value,
          error: !!fieldState?.error?.message || error,
          helperText: fieldState?.error?.message || helperText || '',
        };

        return <BasePhoneNumber {...PhoneNumberProps} {...fieldProps} />;
      }}
      rules={rules}
      shouldUnregister={!!shouldUnregister}
    />
  );
};

PhoneNumber.defaultProps = {
  error: false,
  helperText: '',
  label: '',
  required: false,
  rules: undefined,
  shouldUnregister: false,
};

PhoneNumber.propTypes = {
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

export default PhoneNumber;
