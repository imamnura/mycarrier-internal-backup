import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@__old/components/elements/Dialog';
import { Checkbox, TextField } from '@components/FormFieldLegion';
import { Select } from '@components/FormField';
import { Box, Text } from '@legion-ui/core';
import {
  FormDropdown,
  FormPackages,
  FormTextField,
  FormUploadFile,
} from './lib';
import Button from '@components/Button';
import useAction from './hooks/useActions';

const NewForm = (props) => {
  const { open, onClose } = props;
  const {
    control,
    formValues,
    onSubmit,
    handleSubmit,
    setValue,
    formState: { isValid, isDirty },
  } = useAction(props);

  const customFormField = () => {
    switch (formValues?.formtype) {
      case 'Text Field':
      case 'Text Area':
        return (
          <FormTextField {...props} control={control} formValues={formValues} />
        );
      case 'Dropdown':
        return (
          <FormDropdown {...props} control={control} formValues={formValues} />
        );
      case 'Upload File':
        return (
          <FormUploadFile
            {...props}
            control={control}
            formValues={formValues}
            setValue={setValue}
          />
        );
      case 'Packages':
        return (
          <FormPackages {...props} control={control} formValues={formValues} />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={open?.open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text children="Add New Form" weight="600" size="h6" />
        <Box pt="16px">
          <Text size="sm" weight="600" block mb="8px" color="#3B525C">
            <Text children="*" size="sm" color="#DE1B1B" />
            Form Type
          </Text>
          <Select
            control={control}
            // label="Form Type"
            menuWidth="100%"
            minWidth="100%"
            name="formtype"
            options={[
              { label: 'Text Field', value: 'Text Field' },
              { label: 'Text Area', value: 'Text Area' },
              { label: 'Dropdown', value: 'Dropdown' },
              { label: 'Upload File', value: 'Upload File' },
              { label: 'Upload BAKES', value: 'Upload BAKES' },
              { label: 'Input SID', value: 'Input SID' },
              { label: 'Packages', value: 'Packages' },
              { label: 'neuCloud', value: 'neuCloud' },
            ]}
            placeholder="Select Form Type"
            // required
            staticHeight={150}
            noBorder={false}
            hideNullHelperText
          />
        </Box>
        <Box pt="16px">
          <TextField
            block
            control={control}
            label="Field Name"
            placeholder="Input field name"
            name="formName"
            required
          />
        </Box>
        <Box pt="16px">
          <TextField
            block
            control={control}
            label="Hint Text"
            placeholder="Input hint text"
            name="hint"
          />
        </Box>
        {customFormField()}
        <Box pt="16px">
          <Checkbox control={control} name="required" label="Mandatory Field" />
        </Box>
        <Box pt="16px">
          <Checkbox
            control={control}
            name="isNotEditableOnReturn"
            label="Non editable when returned"
          />
        </Box>
        <div
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'flex-end',
            marginTop: '24px',
          }}
        >
          <Button children="Cancel" variant="ghost" onClick={onClose} />
          <Button
            children="Add Form"
            disabled={!isValid || !isDirty}
            type="submit"
          />
        </div>
      </form>
    </Dialog>
  );
};

NewForm.defaultProps = {
  control: {},
  open: false,
  onClose: () => {},
};

NewForm.propTypes = {
  control: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default NewForm;
