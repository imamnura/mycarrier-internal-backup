import TextField from '@components/TextField/TextField';
import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
// eslint-disable-next-line import/extensions
import 'react-international-phone/style.css';
import {
  defaultCountries,
  FlagEmoji,
  usePhoneInput,
} from 'react-international-phone';
import Select from '@components/Select';
import PropTypes from 'prop-types';

const PhoneNumber = (props) => {
  const { value: val, onChange, errorState, ...otherProps } = props;

  const value = `${val.dialCode || ''} ${val.number || ''}`;

  const { country, handlePhoneValueChange, phone, setCountry } = usePhoneInput({
    defaultCountry: 'id',
    value: value,
    countries: defaultCountries,
    onChange: (data) => {
      const splittedPhone = data.phone.split(' ');
      onChange({
        dialCode: splittedPhone[0],
        number: splittedPhone.slice(1).join(' '),
      });
    },
  });

  useEffect(() => {
    setCountry(value.dialCode);
  }, [value]);

  return (
    <>
      <Box sx={{ display: 'flex', gap: 8 }}>
        <Select
          isDisabled={otherProps.disabled}
          isSearchable
          onChange={setCountry}
          options={defaultCountries.map((c) => ({
            customOption: {
              flag: <FlagEmoji iso2={c[1]} style={{ display: 'flex' }} />,
              type: 'phone',
            },
            label: c[0],
            value: c[1],
          }))}
          value={country}
        />
        <Box sx={{ flexGrow: 1, mt: '-4px' }}>
          <TextField
            changeType="event"
            onChange={handlePhoneValueChange}
            value={phone}
            {...otherProps}
            error={errorState.isSubmitted && !!errorState?.number}
            helperText={
              errorState.isSubmitted ? errorState?.number?.message : ''
            }
          />
        </Box>
      </Box>
    </>
  );
};

PhoneNumber.defaultProps = {
  disabled: false,
  error: false,
  errorState: {},
  helperText: '',
  label: '',
  onChange: () => {},
  required: false,
  value: {
    dialCode: '+62',
    number: '',
  },
};

PhoneNumber.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorState: PropTypes.object,
  helperText: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.object,
};

export default PhoneNumber;
