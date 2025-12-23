import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from '@material-ui/core';
import useStyles from './styles';
import Typography from '@components/Typography';

const RadioGroup = (props) => {
  const {
    alignItems,
    disabled,
    error,
    direction,
    helperText,
    options,
    value,
    onChange,
    required,
    label,
    hideHelper,
    ...otherProps
  } = props;
  const [focus, setFocus] = useState(false);

  const classes = useStyles({
    alignItems,
    helperText,
    disabled,
    error,
    direction,
    required,
    focus,
  });

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
    <>
      {label && required && (
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
      <MuiRadioGroup
        {...otherProps}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        row={direction === 'horizontal'}
        value={value}
      >
        {options.map(({ label, value, mb }) => (
          <Box key={value} mb={mb}>
            <FormControlLabel
              classes={{
                root: classes.labelRoot,
                label: classes.radioLabel,
              }}
              control={
                <Radio
                  classes={{
                    disabled: classes.iconDisabled,
                    root: classes.icon,
                    checked: classes.iconChecked,
                  }}
                  size="small"
                />
              }
              disabled={disabled}
              // key={value}
              label={
                <>
                  {typeof label === 'string' ? (
                    <Typography variant="subtitle1">{label}</Typography>
                  ) : (
                    label
                  )}
                </>
              }
              value={value}
            />
          </Box>
        ))}
      </MuiRadioGroup>
      {(!hideHelper || (hideHelper && helperText)) && (
        <div className={classes.helper}>
          <Typography children={helperText} variant="caption" />
        </div>
      )}
    </>
  );
};

RadioGroup.defaultProps = {
  alignItems: 'center',
  direction: 'vertical',
  disabled: false,
  error: false,
  helperText: '',
  hideHelper: false,
  label: '',
  options: [],
  required: false,
  value: null,
};

RadioGroup.propTypes = {
  alignItems: PropTypes.oneOf(['flex-start', 'center']),
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  hideHelper: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default RadioGroup;
