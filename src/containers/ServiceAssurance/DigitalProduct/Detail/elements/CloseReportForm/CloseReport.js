import React from 'react';
import { string, array, object } from 'yup';
import { Box, Modal, Text } from '@legion-ui/core';
import { FileUpload } from '@components/FormField';
import { TextArea } from '@components/FormFieldLegion';
import Button from '@components/Button';
import useActions from './hooks/useActions';
import useStyles from './styles';
import { postUploadCloseTicket } from '../../../_repositories/repositories';

const CloseReportForm = (props) => {
  const { open } = props;
  const classes = useStyles();

  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    onClose,
    onSubmit,
  } = useActions(props);

  return (
    <Modal
      show={open}
      title="Close & Report"
      onClose={onClose}
      className={classes.modal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb="12px">
          <TextArea
            block
            control={control}
            // label="Root Cause"
            label="Notes"
            name="cause"
            // placeholder="Input root cause"
            placeholder="Input notes"
            rows={3}
            required
            rules={{
              validate: async (value) =>
                string()
                  .required()
                  // .label(`Root Cause`)
                  .label(`Notes`)
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message),
            }}
          />
        </Box>
        {/* <TextArea
          block
          control={control}
          label="Action"
          name="resolution"
          placeholder="Input action"
          rows={3}
          required
          rules={{
            validate: async (value) =>
              string()
                .required()
                .label(`Action`)
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        /> */}
        <Box pb="24px">
          <Text size="sm" weight="600" block mb="8px" mt="12px" color="#3B525C">
            <Text children="*" size="sm" color="#DE1B1B" />
            Evidence
          </Text>
          <FileUpload
            accept={['.jpg', '.png']}
            control={control}
            fetcher={postUploadCloseTicket}
            name="evidence"
            helperText="File in .jpg and .png only, up to 5 files with max. 1MB/file"
            maxSize={1048576}
            placeholder="Click here to upload file"
            maxFile={5}
            rules={{
              validate: async (value) => {
                return array()
                  .of(object().nullable().required().label('Evidence'))
                  .nullable()
                  .required()
                  .min(1)
                  .label('Evidence')
                  .validate(value)
                  .then(() => true)
                  .catch((err) => err?.message);
              },
            }}
          />
        </Box>
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

export default CloseReportForm;
