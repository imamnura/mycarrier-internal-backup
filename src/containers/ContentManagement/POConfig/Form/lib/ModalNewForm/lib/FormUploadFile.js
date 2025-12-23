import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, TextField } from '@components/FormFieldLegion';
import { Box, Text } from '@legion-ui/core';

const CheckboxGroup = ({ control, values = [], setValue }) => {
  const onChange = (value) => () => {
    values.indexOf(value) > -1
      ? setValue(
          'fileType',
          values.filter((x) => x !== value),
        )
      : setValue('fileType', [...values, value]);
  };

  return (
    <div>
      <Text size="sm" weight="600" block color="#3B525C">
        <Text children="*" size="sm" color="#DE1B1B" />
        File Type
      </Text>
      {['jpg', 'png', 'pdf'].map((option, index) => (
        <Box pt="8px" key={option[index]}>
          <Checkbox
            control={control}
            checked={values?.includes(option)}
            customValue
            onChange={onChange(option)}
            label={option?.toUpperCase()}
            name="fileType"
            value={option}
          />
        </Box>
      ))}
    </div>
  );
};

const FormUploadFile = (props) => {
  const { control, setValue, formValues } = props;

  return (
    <>
      <Box pt="16px">
        <CheckboxGroup
          control={control}
          setValue={setValue}
          values={formValues?.fileType}
        />
      </Box>
      <Box pt="16px">
        <TextField
          control={control}
          after="MB"
          name="maxSize"
          type="number"
          label="Max. File Size"
        />
      </Box>
      <Box pt="16px">
        <Box pb="8px">
          <Checkbox
            control={control}
            name="isMultiple"
            label="Upload Multiple File"
          />
        </Box>
        <TextField
          control={control}
          after="MAX"
          before="File"
          name="multiple"
          type="number"
          disabled={!formValues?.isMultiple}
        />
      </Box>
    </>
  );
};

FormUploadFile.defaultProps = {
  formValues: {},
};

FormUploadFile.propTypes = {
  control: PropTypes.object.isRequired,
  formValues: PropTypes.object,
  setValue: PropTypes.func.isRequired,
};

export default FormUploadFile;
