import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Search } from '@material-ui/icons';
import { InputBase } from '@material-ui/core';

const Component = (props) => {
  const { onChange, classes, placeholder, value, border } = props;

  const handleChange = ({ target: { value } }) => {
    onChange(value);
  };

  return (
    <InputBase
      classes={{
        input: clsx(classes.baseInput, {
          [classes.noBorder]: !border,
        }),
      }}
      fullWidth
      onChange={handleChange}
      placeholder={placeholder}
      startAdornment={<Search className={classes.icon} />}
      value={value}
    />
  );
};

Component.defaultProps = {
  border: true,
  value: '',
};

Component.propTypes = {
  border: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Component;
