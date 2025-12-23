import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import Dropdown from '@components/Dropdown';
import useStyles from './styles';

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

const SelectPrimary = (props) => {
  const {
    options,
    placeholder,
    label,
    required,
    onChange: _onChange,
    value: _value,
    error,
    helperText,
    isMulti,
    rawValue,
    noBorder,
    hideNullHelperText,
    ...otherProps
  } = props;

  const onChange = (res) => _onChange(isMulti || rawValue ? res : res.value);
  const value =
    isMulti || rawValue ? _value : options.find((o) => o.value === _value);

  const [focus, setFocus] = useState(false);

  const classes = useStyles({ disabled: otherProps.isDisabled, error, focus });

  const onFocus = (e) => {
    setFocus(true);
    if (otherProps.onFocus) {
      otherProps.onFocus(e);
    }
  };

  const onBlur = (e) => {
    setFocus(false);
    if (otherProps.onBlur) {
      otherProps.onBlur(e);
    }
  };

  return (
    <div>
      {required && (
        <Typography
          children="*"
          className={classes.required}
          color="primary-main"
          variant="overline"
          weight="medium"
        />
      )}
      {label && (
        <Typography
          children={label}
          className={classes.label}
          variant="overline"
          weight="medium"
        />
      )}
      <Dropdown
        {...otherProps}
        isMulti={isMulti}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        options={options}
        placeholder={placeholder}
        value={value || ''}
        noBorder={noBorder}
      />
      {(helperText || !hideNullHelperText) && (
        <div className={classes.helper}>
          <Typography children={helperText} variant="caption" />
        </div>
      )}
    </div>
  );
};

SelectPrimary.defaultProps = {
  error: false,
  helperText: '',
  hideNullHelperText: false,
  isMulti: false,
  label: '',
  noBorder: true,
  options: [],
  placeholder: 'Choose Options',
  rawValue: false,
  required: false,
};

SelectPrimary.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  hideNullHelperText: PropTypes.bool,
  isMulti: PropTypes.bool,
  label: PropTypes.string,
  noBorder: PropTypes.bool,
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
};

export default SelectPrimary;
