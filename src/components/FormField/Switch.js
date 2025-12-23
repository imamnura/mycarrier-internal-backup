import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseSwitch from '../Switch';

/**
 *
 * @typedef {import('@material-ui/core').SwitchProps} SwitchProps -n
 *
 * @param {SwitchProps} props -n
 * @returns {React.FC} -n
 */

const Switch = (props) => {
  const { control, name, defaultValue, ...switchProps } = props;

  return (
    <Controller
      control={control}
      defaultValue={defaultValue || false}
      name={name}
      render={({ field }) => {
        const { value = false, onChange } = field;
        const fieldProps = {
          onChange,
          value,
        };

        return <BaseSwitch {...switchProps} {...fieldProps} />;
      }}
    />
  );
};

Switch.defaultProps = {
  defaultValue: false,
};

Switch.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  defaultValue: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default Switch;
