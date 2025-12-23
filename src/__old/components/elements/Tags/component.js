/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const Component = ({ options, disabled, initialValue, getValue, ...props }) => {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    setData(initialValue);
  }, [initialValue]);

  const handleChange = (event, value) => {
    setData(value);
    getValue(value);
  };

  return (
    <div>
      <Autocomplete
        disabled={disabled}
        getOptionLabel={(option) => option.label}
        multiple
        onChange={handleChange}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            disabled={disabled}
            variant="standard"
            {...props}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={option?.label + index}
              label={option?.label}
              variant="outlined"
              {...getTagProps({ index })}
            />
          ))
        }
        value={data}
      />
    </div>
  );
};

Component.propTypes = {
  disabled: false,
  getValue: () => null,
  initialValue: [],
  options: [],
};

Component.defaultProps = {
  disabled: PropTypes.bool,
  getValue: PropTypes.func.isRequired,
  initialValue: PropTypes.array,
  options: PropTypes.array,
};

export default Component;
