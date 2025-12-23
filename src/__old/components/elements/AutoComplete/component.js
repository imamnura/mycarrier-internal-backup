import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import TextField from '../TextField';
import Text from '../Text';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '../Paper';

const Component = (props) => {
  const {
    isLoading,
    input,
    options,
    label,
    classes,
    meta,
    disabled,
    required,
  } = props;

  const onChange = input.onChange;

  const CustomPaper = (rest) => <Paper {...rest} style={{ padding: 0 }} />;

  const [touched, setTouched] = useState(false);

  const customLabelRequired = (label) => {
    return (
      <>
        <Text color="primary" variant="subtitle2">
          *{' '}
        </Text>
        {label}
      </>
    );
  };

  return (
    <Autocomplete
      classes={{
        option: classes.option,
        loading: classes.loading,
      }}
      disableClearable
      disabled={disabled}
      freeSolo
      loading={isLoading}
      onChange={(e, value) => onChange(value)}
      onInputChange={(e, value) => {
        onChange(value);
        setTouched(true);
      }}
      options={options}
      PaperComponent={CustomPaper}
      renderInput={(params) => (
        <TextField
          label={required ? customLabelRequired(label) : label}
          meta={{ ...meta, touched: touched }}
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: isLoading && (
              <CircularProgress color="inherit" size={20} />
            ),
          }}
        />
      )}
      value={input.value}
    />
  );
};

Component.defaultProps = {
  disabled: false,
  isLoading: false,
  label: '',
  required: false,
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool,
};

export default Component;
