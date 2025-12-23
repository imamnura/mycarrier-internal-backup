import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseWysiwyg from '../Wysiwyg';

const Wysiwyg = (props) => {
  const {
    control,
    name,
    helperText,
    error,
    rules,
    shouldUnregister,
    ...WysiwygProps
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
          value,
          error: !!fieldState?.error?.message || error,
          helperText: fieldState?.error?.message || helperText || '',
        };

        return <BaseWysiwyg {...WysiwygProps} {...fieldProps} />;
      }}
      rules={rules}
      shouldUnregister={!!shouldUnregister}
    />
  );
};

Wysiwyg.defaultProps = {
  error: false,
  helperText: '',
  rules: undefined,
  shouldUnregister: false,
};

Wysiwyg.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  shouldUnregister: PropTypes.bool,
};

export default Wysiwyg;
