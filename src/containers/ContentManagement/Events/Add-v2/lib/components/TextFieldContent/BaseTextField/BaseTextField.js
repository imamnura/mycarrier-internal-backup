/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  InputAdornment as BaseAdornment,
  TextField as BaseField,
} from '@material-ui/core';
import useStyles from './styles';
import Typography from '@components/Typography';
import Eye from '@assets/icon-v2/Eye';
import EyeDisabled from '@assets/icon-v2/EyeDisabled';

export const Adornment = (props) => {
  const { position, children, classes } = props;

  let content = '';

  if (typeof children === 'string') {
    content = (
      <Typography
        children={children}
        className={classes.adornmentText}
        color="general-main"
      />
    );
  } else if (typeof children === 'function') {
    const Icon = children;
    content = <Icon className={classes.adornmentIcon} />;
  } else {
    content = children;
  }

  return (
    content && <BaseAdornment position={position}>{content}</BaseAdornment>
  );
};

/**
 *
 * @typedef {import('@material-ui/core').TextFieldProps} TextFieldProps -n
 *
 * @param {TextFieldProps} props -n
 * @returns {React.FC} -n
 */

const BaseTextField = (props) => {
  const {
    leftAdornment,
    rightAdornment,
    type,
    maxLength,
    helperText,
    required,
    label: _label,
    InputProps,
    ...otherProps
  } = props;

  const [inputType, setInputType] = useState(type);
  const [charLength, setCharLength] = useState(props?.value?.length || 0);
  const classes = useStyles(props);

  const LeftAdornment = (
    <Adornment children={leftAdornment} classes={classes} position="start" />
  );

  const RightAdornment = (
    <Adornment children={rightAdornment} classes={classes} position="end" />
  );

  let adornmentProps = {};

  if (leftAdornment) {
    adornmentProps.startAdornment = LeftAdornment;
  }

  if (rightAdornment) {
    adornmentProps.endAdornment = RightAdornment;
  }

  if (type === 'password') {
    const Icon = inputType === 'password' ? Eye : EyeDisabled;
    const toggleValue = inputType === 'text' ? 'password' : 'text';
    const togglePassword = () => setInputType(toggleValue);

    adornmentProps.endAdornment = (
      <Adornment
        children={
          <Icon className={classes.showHidePassword} onClick={togglePassword} />
        }
        classes={classes}
        position="end"
      />
    );
  }

  const label = !required ? (
    _label
  ) : (
    <span>
      <span className={classes.labelAsterisk}>*</span>
      {_label}
    </span>
  );

  useEffect(() => {
    if (maxLength) {
      const val = props?.value || '';
      const valLength = val.length;
      if (valLength <= maxLength) {
        setCharLength(val.length);
      }
    }
  }, [props?.value]);

  useEffect(() => {
    setInputType(type);
  }, [type]);

  const handleChange = (event) => {
    const val = event.target.value;
    const valLength = val.length;
    if (maxLength && valLength > maxLength) {
      return undefined;
    } else if (props.onChange) {
      props.onChange(val);
    } else if (props?.inputProps?.onChange) {
      props.inputProps.onChange(event, val);
    } else {
      return undefined;
    }
  };

  return (
    <>
      <BaseField
        {...otherProps}
        classes={{
          root: classes.root,
        }}
        fullWidth
        InputLabelProps={{
          classes: {
            disabled: classes.labelDisabled,
            error: classes.labelError,
            focused: classes.labelFocused,
            root: classes.label,
            shrink: classes.labelShrink,
          },
        }}
        InputProps={{
          ...InputProps,
          classes: {
            disabled: classes.inputDisabled,
            input: classes.input,
            root: classes.inputRoot,
            underline: classes.underline,
          },
          ...adornmentProps,
        }}
        label={label}
        onChange={handleChange}
        type={inputType}
      />
      <div className={classes.helper}>
        <Typography children={helperText} variant="caption" />
        {!!maxLength && (
          <Typography
            children={`${charLength}/${maxLength}`}
            variant="caption"
          />
        )}
      </div>
    </>
  );
};

Adornment.defaultProps = {
  children: null,
  position: 'start',
};

Adornment.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object.isRequired,
  position: PropTypes.oneOf(['start', 'end']),
};

BaseTextField.defaultProps = {
  helperText: '',
  inputProps: {},
  InputProps: {},
  label: '',
  leftAdornment: null,
  maxLength: 0,
  onChange: undefined,
  required: false,
  rightAdornment: null,
  type: 'text',
  value: undefined,
};

BaseTextField.propTypes = {
  helperText: PropTypes.string,
  inputProps: PropTypes.object,
  InputProps: PropTypes.object,
  label: PropTypes.string,
  leftAdornment: PropTypes.any,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  rightAdornment: PropTypes.any,
  type: PropTypes.oneOf(['text', 'password', 'number']),
  value: PropTypes.string,
};

export default BaseTextField;
