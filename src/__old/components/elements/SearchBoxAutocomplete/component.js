/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Search } from '@material-ui/icons';

const Component = ({
  classes,
  disabled,
  label,
  getValue,
  options,
  ...props
}) => {
  const handleGetValue = (e, value) => {
    getValue(value);
  };

  return (
    <Autocomplete
      autoSelect={true}
      defaultValue={[]}
      disableClearable={true}
      disabled={disabled}
      getOptionLabel={(option) => option[label] || ''}
      id="searchbox"
      onChange={handleGetValue}
      openOnFocus={true}
      options={options}
      renderInput={(params) => {
        params.InputProps.startAdornment = (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        );
        return (
          <TextField
            {...params}
            className={classes.field}
            size="small"
            variant="outlined"
            {...props}
          />
        );
      }}
      value={''}
    />
  );
};

export default Component;

Component.defaultProps = {
  classes: {},
  disabled: false,
  label: '',
  options: [],
};

Component.propTypes = {
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  getValue: PropTypes.func.isRequired,
  label: PropTypes.string,
  options: PropTypes.array,
};
