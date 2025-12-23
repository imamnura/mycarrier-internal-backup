/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import TextField from '../TextField';
import Loading from '../Loading';
import useStyles from './styles';

const filter = createFilterOptions();

export const AutoCompleteLoading = () => <Loading color="primary" />;

/**
 *
 * @typedef {import('@material-ui/lab/Autocomplete').AutocompleteProps} AutoCompleteProps -n
 *
 * @param {AutoCompleteProps} props -n
 * @returns {React.FC} -n
 */

const AutoComplete = (props) => {
  const {
    helperText,
    label,
    leftAdornment,
    loading,
    maxLength,
    required,
    rightAdornment: _rightAdornment,
    textFieldProps: otherTextFieldProps,
    error,
    value: _value,
    customOnChange,
    disableFilterOptions,
    allowSelectSameValue,
    ...autoCompleteProps
  } = props;

  const [value, setValue] = useState(_value);

  let rightAdornment;

  if (_rightAdornment) {
    rightAdornment = _rightAdornment;
  }

  if (loading) {
    rightAdornment = AutoCompleteLoading;
  }

  const onChange = (e, v, reason) => {
    props.onChange(v);
    customOnChange({ value: v, reason, element: e });
  };

  const classes = useStyles();

  return (
    <Autocomplete
      {...autoCompleteProps}
      filterOptions={(options, params) => {
        if (disableFilterOptions) {
          return options;
        } else {
          return filter(options, { ...params, inputValue: props.value });
        }
      }}
      classes={{ option: classes.option, paper: classes.paper }}
      disableClearable
      freeSolo
      onChange={onChange}
      onInputChange={onChange}
      onSelect={() => (allowSelectSameValue ? setValue(null) : {})}
      renderInput={({ InputProps: otherInputProps, ...otherAutoProps }) => {
        const textFieldProps = {
          helperText,
          label,
          leftAdornment,
          maxLength,
          required,
          rightAdornment,
          error,
        };

        return (
          <TextField
            {...otherAutoProps}
            {...otherTextFieldProps}
            {...textFieldProps}
            InputProps={{
              ...otherTextFieldProps.InputProps,
              ref: otherInputProps.ref,
            }}
            inputProps={{
              ...otherAutoProps.inputProps,
              maxLength,
            }}
            value={allowSelectSameValue ? value : _value}
            valueLength={_value.length}
          />
        );
      }}
      value={allowSelectSameValue ? value : _value}
    />
  );
};

AutoComplete.defaultProps = {
  customOnChange: () => {},
  error: false,
  helperText: '',
  label: '',
  leftAdornment: null,
  loading: false,
  maxLength: 0,
  onChange: () => {},
  required: false,
  rightAdornment: null,
  textFieldProps: {},
  value: '',
  disableFilterOptions: false,
  allowSelectSameValue: false,
};

AutoComplete.propTypes = {
  customOnChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  leftAdornment: PropTypes.any,
  loading: PropTypes.bool,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  rightAdornment: PropTypes.any,
  textFieldProps: PropTypes.object,
  value: PropTypes.string,
  disableFilterOptions: PropTypes.bool,
  allowSelectSameValue: PropTypes.bool,
};

export default AutoComplete;
