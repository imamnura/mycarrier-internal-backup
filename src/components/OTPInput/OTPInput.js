import React from 'react';
import PropTypes from 'prop-types';
import OtpInputBase from 'react-otp-input';
import Typography from '../Typography';
import useStyles from './styles';

const OTPInput = (props) => {
  const {
    required,
    label,
    helperText,
    error,
    disabled,
    onChange,
    value,
    numInputs,
  } = props;

  const classes = useStyles({ error, disabled });

  return (
    <>
      {required && (
        <Typography
          children="*"
          className={classes.required}
          color="primary-main"
          variant="body2"
        />
      )}
      <Typography children={label} className={classes.label} variant="body2" />
      <OtpInputBase
        containerStyle={classes.container}
        disabledStyle={classes.disabled}
        errorStyle={classes.error}
        hasErrored={error}
        inputStyle={classes.input}
        isDisabled={disabled}
        numInputs={numInputs}
        onChange={onChange}
        value={value}
      />
      <div className={classes.helper}>
        <Typography children={helperText} variant="caption" />
      </div>
    </>
  );
};

OTPInput.defaultProps = {
  disabled: false,
  error: false,
  helperText: '',
  label: '',
  numInputs: 11,
  onChange: () => {},
  required: false,
  value: '',
};

OTPInput.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  numInputs: PropTypes.number,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default OTPInput;
