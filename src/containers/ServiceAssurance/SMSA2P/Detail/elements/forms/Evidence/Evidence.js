import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { TextField, FileUpload } from '@components/FormField';
import useActions from './hooks/useActions';

export default function ReturnForm(props) {
  const { modalEvidence } = props;

  const {
    control,
    formState: { isValid, isDirty },
    fetchUpdateStatus,
    handleSubmit,
    onClose,
  } = useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalEvidence}>
      <form onSubmit={handleSubmit(fetchUpdateStatus)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          {modalEvidence?.title && (
            <Grid align="center" item xs={12}>
              <Typography variant="h5" weight="medium">
                {modalEvidence?.title}
              </Typography>
            </Grid>
          )}
          {modalEvidence?.textInfo && (
            <Grid align="center" item xs={12}>
              <Typography variant="caption" weight="normal">
                {modalEvidence?.textInfo}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Evidence to Customer"
              maxLength={modalEvidence?.maxLengthReason || 1500}
              minRows={4}
              multiline
              name="note"
              placeholder={
                modalEvidence?.placeholder || 'Please describe the reason..'
              }
              required
            />
          </Grid>
          {modalEvidence?.withUpload ? (
            <Grid align="center" item xs={12}>
              <FileUpload
                accept={['.pdf', '.jpg', '.jpeg', '.png']}
                control={control}
                helperText="Upload .jpg, .png or .pdf document, max 500 KB "
                maxSize={512000}
                name="media"
                placeholder="Example: evidence.jpg"
              />
            </Grid>
          ) : (
            ''
          )}
          {modalEvidence?.caption && (
            <Grid item xs={12}>
              <Typography variant="caption" weight="normal">
                {modalEvidence?.caption}
              </Typography>
            </Grid>
          )}
          <Grid container item justifyContent="center" pt={2} spacing={2}>
            <Grid item>
              <Button onClick={onClose} variant="ghost">
                CANCEL
              </Button>
            </Grid>
            <Grid item>
              <Button disabled={!isValid || !isDirty} type="submit">
                {modalEvidence?.submitText || 'SUBMIT'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

ReturnForm.defaultProps = {
  modalEvidence: null,
};

ReturnForm.propTypes = {
  modalEvidence: PropTypes.object,
};
