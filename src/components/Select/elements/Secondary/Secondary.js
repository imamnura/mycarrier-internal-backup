import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import Dropdown from '@components/Dropdown';
import useStyles, { useSelectStyle } from './styles';

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

const Select = (props) => {
  const {
    options,
    label,
    required,
    onChange: _onChange,
    value: _value,
    error,
    helperText,
    isMulti,
    rawValue,
    noBorder,
    ...otherProps
  } = props;

  const onChange = (res) => _onChange(isMulti || rawValue ? res : res.value);
  const value =
    isMulti || rawValue ? _value : options.find((o) => o.value === _value);

  const [focus, setFocus] = useState(false);

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

  const shrink = !!focus || !!value;

  const classes = useStyles({
    disabled: otherProps.isDisabled,
    error,
    focus,
    shrink,
  });
  const styles = useSelectStyle({ shrink });

  return (
    <div className={classes.root}>
      <div className={classes.labelContainer}>
        {required && (
          <Typography
            children="*"
            className={classes.required}
            color="primary-main"
            variant={'body2'}
            weight="medium"
          />
        )}
        {label && (
          <Typography
            children={label}
            className={classes.label}
            variant={'body2'}
            weight={shrink ? 'medium' : 'normal'}
          />
        )}
      </div>
      <div className={classes.dropdownContainer}>
        <Dropdown
          {...otherProps}
          additionalWidth={-1.5}
          isMulti={isMulti}
          isSearchable
          minWidth={200}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          options={options}
          placeholder={'General Manager Position'}
          required
          styles={styles}
          value={value || ''}
          noBorder={noBorder}
        />
        <div className={classes.helper}>
          <Typography children={helperText} variant="caption" />
        </div>
      </div>
    </div>
  );
};

Select.defaultProps = {
  error: false,
  helperText: '',
  isMulti: false,
  label: '',
  noBorder: true,
  options: [],
  placeholder: 'Choose Options',
  rawValue: false,
  required: false,
};

Select.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
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

export default Select;
