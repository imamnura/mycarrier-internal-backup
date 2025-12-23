import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseDatePicker from '@components/DatePicker';

const SelectDatePicker = (props) => {
  const { control, error, name, rules, ...DatePickerProps } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value, onChange, name } = field;
        const fieldProps = {
          name,
          onChange,
          value,
          error: fieldState?.error?.message || error,
        };

        return (
          <>
            <BaseDatePicker
              autoOk
              error={error}
              onChange={onChange}
              value={value}
              {...DatePickerProps}
              {...fieldProps}
            />
          </>
        );
      }}
      rules={rules}
    />
  );
};

SelectDatePicker.defaultProps = {
  control: {},
  disabled: false,
  error: '',
  name: '',
};

SelectDatePicker.propTypes = {
  control: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  name: PropTypes.string,
};

export default SelectDatePicker;
