import React from 'react';
import PropTypes from 'prop-types';
import Primary from './elements/Primary';
import Secondary from './elements/Secondary';

/**
 *
 * @typedef {import('@material-ui/pickers').StaticDateRangePickerProps} DateRangePickerProps -n
 *
 * @param {DateRangePickerProps} props -n
 * @returns {React.FC} -n
 */

const DateRangePicker = (_props) => {
  const { variant, ...props } = _props;

  let Component = Primary;

  if (variant === 'secondary') {
    Component = Secondary;
  }

  return <Component {...props} />;
};

DateRangePicker.defaultProps = {
  disabled: false,
  error: false,
  helperText: '',
  label: 'Select Date',
  maxTime: null,
  minTime: null,
  required: false,
  value: null,
  variant: 'primary',
};

DateRangePicker.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  maxTime: PropTypes.string,
  minTime: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

export default DateRangePicker;
