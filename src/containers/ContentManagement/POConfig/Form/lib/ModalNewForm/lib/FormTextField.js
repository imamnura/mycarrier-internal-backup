import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@components/FormFieldLegion';
import { Box, Text } from '@legion-ui/core';
import { Select } from '@components/FormField';
import { regexString } from '../utils';

const FormTextField = (props) => {
  const { control } = props;

  return (
    <>
      <Box pt="16px">
        <TextField
          block
          control={control}
          label="Custom Placeholder Text"
          placeholder="Input custom placeholder text"
          name="placeholder"
        />
      </Box>
      <Box pt="16px">
        <Text size="sm" weight="600" block mb="8px" color="#3B525C">
          <Text children="*" size="sm" color="#DE1B1B" />
          Field Validation
        </Text>
        <Select
          control={control}
          // label="Field Validation"
          menuWidth="100%"
          minWidth="100%"
          name="regex"
          options={[
            { label: 'All Characters', value: regexString.allChar },
            { label: 'Only Letters', value: regexString.onlyLetter },
            { label: 'Only Numbers', value: regexString.onlyNumber },
            { label: 'Phone Numbers', value: regexString.phoneNumber },
          ]}
          placeholder="Input Regex Validation"
          // required
          noBorder={false}
          hideNullHelperText
        />
      </Box>
      <Box pt="16px">
        <TextField
          after="Character"
          control={control}
          label="Maximum Number of Characters"
          name="maxChar"
          type="number"
          required
        />
      </Box>
    </>
  );
};

FormTextField.defaultProps = {
  control: {},
};

FormTextField.propTypes = {
  control: PropTypes.object,
};

export default FormTextField;
