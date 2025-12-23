import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@components/FormFieldLegion';
import { Box } from '@legion-ui/core';

const FormTextField = (props) => {
  const { control } = props;

  return (
    <>
      <Box pt="16px">
        <TextField
          block
          control={control}
          label="API"
          placeholder="Input API Endpoint"
          name="api"
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
