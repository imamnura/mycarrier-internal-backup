import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseFileUpload from '../FileUpload';

const FileUpload = (props) => {
  const {
    control,
    name,
    helperText,
    error,
    rules,
    shouldUnregister,
    ...fileUploadProps
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value = '', onChange } = field;
        const fieldProps = {
          onChange,
          value,
          error: !!fieldState?.error?.message || error,
          helperText: fieldState?.error?.message || helperText || '',
        };

        return <BaseFileUpload {...fileUploadProps} {...fieldProps} />;
      }}
      rules={rules}
      shouldUnregister={!!shouldUnregister}
    />
  );
};

FileUpload.defaultProps = {
  error: false,
  helperText: '',
};

FileUpload.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default FileUpload;
