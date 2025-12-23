import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import Text from '../Text';
import TextField from '../TextField';
import clsx from 'clsx';

const Component = (props) => {
  const {
    classes,
    input,
    meta,
    options,
    label,
    direction,
    isGrey,
    onAfterChange,
  } = props;

  const isError = meta.invalid && !meta.pristine;

  const [customValue, setCustomValue] = useState(
    options.some((x) => x.value === input.value) ? ' ' : input.value,
  );

  const handleCustomChange = ({ target: { value } }) => {
    setCustomValue(value);
    input.onChange(value);

    if (onAfterChange) {
      onAfterChange(value);
    }
  };

  const handleNormalChange = (v) => {
    input.onChange(v);
    setCustomValue('');

    if (onAfterChange) {
      onAfterChange(v?.target?.value);
    }
  };

  return (
    <FormControl error={isError}>
      <Text color={isError ? 'primary' : 'grey'} variant="caption">
        {label}
      </Text>
      <RadioGroup
        onChange={handleNormalChange}
        row={direction === 'horizontal'}
        value={input.value}
      >
        {options.map(({ value, label, withCustomField, disabled }) => {
          const property = withCustomField
            ? {
                label: (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Text color={isGrey ? 'grey' : 'default'} variant="body2">
                      {label}
                    </Text>
                    &nbsp;&nbsp;&nbsp;
                    <TextField
                      input={{
                        value: customValue,
                        onChange: handleCustomChange,
                      }}
                    />
                  </div>
                ),
                value: customValue,
              }
            : { label, value };

          return (
            <FormControlLabel
              classes={{
                label: clsx(classes.radioLabel, {
                  [classes.xGrey]: isGrey || disabled,
                }),
                root: clsx({
                  [classes.rootControl]: typeof label !== 'string',
                  [classes.rootFormRadio]: options.length < 3,
                  [classes.rootFormRadioSmall]: options.length >= 3,
                }),
              }}
              control={
                <Radio
                  classes={{
                    colorPrimary: clsx(classes.radio, {
                      [classes.xGrey]: isGrey || disabled,
                    }),
                  }}
                  color="primary"
                  size="small"
                />
              }
              disabled={disabled}
              key={value}
              {...property}
            />
          );
        })}
      </RadioGroup>
      <Text color="primary" variant="overline">
        {isError && meta.error}
      </Text>
    </FormControl>
  );
};

Component.defaultProps = {
  classes: {},
  direction: 'horizontal',
  isGrey: false,
  label: '',
  meta: { touched: false, invalid: false, error: '' },
  onAfterChange: (data) => data,
};

Component.propTypes = {
  classes: PropTypes.object,
  direction: PropTypes.string,
  input: PropTypes.object.isRequired,
  isGrey: PropTypes.bool,
  label: PropTypes.string,
  meta: PropTypes.object,
  onAfterChange: PropTypes.func,
  options: PropTypes.array.isRequired,
};

export default Component;
