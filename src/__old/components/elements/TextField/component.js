import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import Text from '../Text';

const Component = (props) => {
  const {
    classes,
    meta: { touched, invalid, error },
    label,
    isTouched,
    id,
    input,
    disabled,
    InputProps,
    InputLabelProps,
    multiline,
    rows,
    required,
    hasCounter,
    counter,
    maxCounter,
    ...rest
  } = props;

  const isError = isTouched ? touched && invalid : invalid;

  const customLabelRequired = (label) => {
    return (
      <>
        <Text color="primary" variant="subtitle2">
          *{' '}
        </Text>
        {label}
      </>
    );
  };

  const CharCount = () => {
    return (
      <Grid container style={{ width: '100%' }}>
        <Grid item style={{ textAlign: 'right' }} xs={12}>
          <Text variant="status">
            {counter}/{maxCounter}
          </Text>
        </Grid>
      </Grid>
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <TextField
        error={isError}
        {...rest}
        {...input}
        disabled={disabled}
        FormHelperTextProps={{
          classes: {
            error: classes.helperError,
          },
        }}
        fullWidth
        helperText={isError ? error : ''}
        id={id}
        InputLabelProps={{
          ...InputLabelProps,
          classes: {
            root: classes.labelRoot,
            focused: classes.labelFocused,
            disabled: classes.labelDisabled,
            error: classes.labelxError,
            shrink: classes.labelShrink,
          },
        }}
        InputProps={{
          ...InputProps,
          classes: {
            root: classes.inputRoot,
            disabled: classes.inputDisabled,
            underline: disabled
              ? classes.inputUnderlineDisabled
              : classes.inputUnderline,
          },
        }}
        label={required ? customLabelRequired(label) : label}
        multiline={multiline}
        rows={rows}
      />
      {hasCounter && <CharCount />}
    </div>
  );
};

Component.defaultProps = {
  counter: 0,
  disabled: false,
  hasCounter: false,
  id: 'text-field',
  InputLabelProps: {},
  InputProps: {},
  isTouched: true,
  label: '',
  maxCounter: 0,
  meta: { touched: false, invalid: false, error: '' },
  multiline: false,
  required: false,
  rows: 0,
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  counter: PropTypes.number,
  disabled: PropTypes.bool,
  hasCounter: PropTypes.bool,
  id: PropTypes.string,
  input: PropTypes.object.isRequired,
  InputLabelProps: PropTypes.object,
  InputProps: PropTypes.object,
  isTouched: PropTypes.bool,
  label: PropTypes.string,
  maxCounter: PropTypes.number,
  meta: PropTypes.object,
  multiline: PropTypes.bool,
  required: PropTypes.bool,
  rows: PropTypes.number,
};

export default Component;
