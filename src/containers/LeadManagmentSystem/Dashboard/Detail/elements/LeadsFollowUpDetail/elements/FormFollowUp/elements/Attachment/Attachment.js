import Button from '@components/Button';
import { FileUpload, Select, TextField } from '@components/FormField';
import Typography from '@components/Typography';
import { Box, Dialog, Grid } from '@material-ui/core';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from '../../styles';
import PropTypes from 'prop-types';
import { postUploadFile } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';

const Attachment = (props) => {
  const { onClose, variant } = props;
  const classes = useStyles();

  const { control, onSubmit, handleSubmit } = useAction(props);

  const title = {
    add: 'Add New Attachment',
    edit: 'Edit Attachment',
  }[variant];

  const submitLabel = {
    add: 'Add Attachment',
    edit: 'Edit Attachment',
  }[variant];

  return (
    <Dialog
      classes={{ paper: classes.dialogRoot }}
      maxWidth="lg"
      open
      scroll="body"
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography color="general-dark" inline variant="h5" weight="medium">
          {title}
        </Typography>
      </Box>
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FileUpload
              accept={['.pdf']}
              control={control}
              fetcher={postUploadFile}
              helperText="Upload .pdf document, max 2 MB "
              maxSize={2097152}
              name="document"
              placeholder="Example: attachment.pdf"
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              control={control}
              isSearchable
              label="Document Type"
              name="docType"
              options={[
                { label: 'Kajian Awal', value: 'kajianAwal' },
                { label: 'Nota Dinas', value: 'notaDinas' },
                { label: 'Others', value: 'others' },
                { label: 'SBR', value: 'sbr' },
                { label: 'Survey Result', value: 'surveyResult' },
              ]}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Description"
              maxLength={160}
              minRows={4}
              multiline
              name="comment"
              required
            />
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <Button ml={16} onClick={handleSubmit(onSubmit)}>
          {submitLabel}
        </Button>
      </Box>
    </Dialog>
  );
};

Attachment.defaultProps = {
  variant: 'add',
};

Attachment.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['add', 'edit']),
};

export default Attachment;
