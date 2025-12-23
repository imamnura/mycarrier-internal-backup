import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import BaseAutoComplete from '../AutoComplete';

/**
 *
 * @typedef {import('@material-ui/lab/Autocomplete').AutocompleteProps} AutoCompleteProps -n
 *
 * @param {AutoCompleteProps} props -n
 * @returns {React.FC} -n
 */

const AutoComplete = (props) => {
  const { control, name, helperText, error, ...autoCompleteProps } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { value = '', onChange, onBlur, name } = field;
        const fieldProps = {
          name,
          onBlur,
          onChange,
          value,
          error: !!fieldState?.error?.message || error,
          helperText: fieldState?.error?.message || helperText || '',
        };

        return <BaseAutoComplete {...autoCompleteProps} {...fieldProps} />;
      }}
    />
  );
};

AutoComplete.defaultProps = {
  error: false,
  helperText: '',
};

AutoComplete.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  control: PropTypes.any.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default AutoComplete;
