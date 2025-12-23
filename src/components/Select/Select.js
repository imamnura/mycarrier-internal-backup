import React from 'react';
import PropTypes from 'prop-types';
import Primary from './elements/Primary';
import Secondary from './elements/Secondary';

/**
 * @description for react-select props information
 *
 * @see {@link https://react-select.com/props}
 *
 * @typedef {import('react-select').Props} SelectProps -n
 *
 * @param {SelectProps} props -n
 * @returns {React.FC} -n
 */

const Select = (_props) => {
  const { variant, ...props } = _props;

  let Component = Primary;

  if (variant === 'secondary') {
    Component = Secondary;
  }

  return <Component {...props} />;
};

Select.defaultProps = {
  error: false,
  helperText: '',
  isMulti: false,
  label: '',
  options: [],
  placeholder: 'Choose Options',
  rawValue: false,
  required: false,
  variant: 'primary',
};

Select.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  isMulti: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  rawValue: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

export default Select;
