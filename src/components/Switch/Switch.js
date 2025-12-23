import React from 'react';
import { Switch as BaseSwitch, withStyles } from '@material-ui/core';
import color from '@styles/color';
import PropTypes from 'prop-types';

export const CustomSwitch = withStyles(() => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: color.general.mid,
    '&$checked': {
      transform: 'translateX(12px)',
      color: color.green.main,
      '& + $track': {
        opacity: 1,
        backgroundColor: color.green.soft,
        borderColor: color.green.soft,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${color.general.soft}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: color.general.soft,
  },
  checked: {},
}))(BaseSwitch);

/**
 *
 * @typedef {import('@material-ui/core').SwitchProps} SwitchProps -n
 *
 * @param {SwitchProps} props -n
 * @returns {React.FC} -n
 */

const Switch = (props) => {
  const { value, onChange: _onChange, ...otherProps } = props;

  const onChange = (e) => {
    _onChange(e?.target?.checked);
  };

  return <CustomSwitch checked={value} onChange={onChange} {...otherProps} />;
};

Switch.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

export default Switch;
