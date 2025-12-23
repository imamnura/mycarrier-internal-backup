import React from 'react';
import { string } from 'yup';
import { Box, Modal, Text } from '@legion-ui/core';
import Button from '@components/Button';
// import { TextArea, TextField } from '@components/FormFieldLegion';
import { TextArea } from '@components/FormFieldLegion';
import { Select } from '@components/FormField';
import useActions from './hooks/useActions';
import useStyles from './styles';

const ValidateForm = (props) => {
  const { open } = props;
  const classes = useStyles();

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    onClose,
    loadingUrgency,
    urgencyOption,
    onSubmit,
  } = useActions(props);

  return (
    <Modal
      show={open}
      title="Validate"
      onClose={onClose}
      className={classes.modal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb="16px">
          <Text size="sm" weight="600" block mb="8px" color="#3B525C">
            <Text children="*" size="sm" color="#DE1B1B" />
            Urgency
          </Text>
          <Select
            control={control}
            menuWidth="100%"
            minWidth="100%"
            name="urgency"
            options={urgencyOption}
            isLoading={loadingUrgency}
            placeholder="Choose urgency"
            noBorder={false}
            hideNullHelperText
            rules={{
              validate: async (value) => {
                return string()
                  .required()
                  .label('Urgency')
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message);
              },
            }}
          />
        </Box>
        <Box mb="12px">
          <TextArea
            block
            control={control}
            label="Description"
            name="description"
            placeholder="Input description"
            rows={3}
            required
            rules={{
              validate: async (value) =>
                string()
                  .required()
                  .label(`Description`)
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message),
            }}
          />
        </Box>
        <TextArea
          block
          control={control}
          label="OCC Notes"
          name="occNotes"
          placeholder="Input notes"
          rows={3}
          required
          rules={{
            validate: async (value) =>
              string()
                .required()
                .label(`OCC Notes`)
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        />
        {/* <Text weight="700" size="20px" block mt="16px" mb="16px">
          PIC Internal
        </Text>
        <Box mb="16px">
          <TextField
            block
            control={control}
            label="Full Name"
            name="picInternal.fullName"
            required={true}
            placeholder="Input full name"
            rules={{
              validate: async (value) => {
                return string()
                  .required()
                  .label('Fullname')
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message);
              },
            }}
          />
        </Box>

        <Box mb="16px">
          <TextField
            block
            control={control}
            label="Phone Number"
            name="picInternal.phoneNumber"
            required={true}
            placeholder="Input Phone Number"
            rules={{
              validate: async (value) => {
                return string()
                  .required('Phone number is required')
                  .matches(/^\+62[0-9]/, 'Phone number must start with +62')
                  .label('Phone Number')
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message);
              },
            }}
          />
        </Box>
        <TextField
          block
          control={control}
          label="Email"
          name="picInternal.email"
          required={true}
          placeholder="Input email"
          rules={{
            validate: async (value) => {
              return string()
                .required()
                .email('Invalid email format')
                .label('Email')
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message);
            },
          }}
        /> */}
        <div className={classes.action}>
          <Button onClick={onClose} variant="ghost">
            CANCEL
          </Button>
          <Button disabled={!isValid || !isDirty} type="submit">
            SUBMIT
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ValidateForm;
