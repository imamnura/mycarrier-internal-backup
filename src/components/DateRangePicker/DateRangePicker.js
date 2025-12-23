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
  label: ['Start Date', 'End Date'],
  value: [null, null],
  variant: 'secondary',
};

DateRangePicker.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array,
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

export default DateRangePicker;
