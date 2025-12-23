import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { TextField, FileUpload } from '@components/FormField';
import useActions from './hooks/useActions';

export default function ReturnForm(props) {
  const { modalReject } = props;

  const {
    control,
    formState: { isValid, isDirty },
    handleUpdateStatus,
    handleSubmit,
    onClose,
  } = useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalReject}>
      <form onSubmit={handleSubmit(handleUpdateStatus)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          {modalReject?.title && (
            <Grid align="center" item xs={12}>
              <Typography variant="h5" weight="medium">
                {modalReject?.title}
              </Typography>
            </Grid>
          )}
          {modalReject?.textInfo && (
            <Grid align="center" item xs={12}>
              <Typography variant="caption" weight="normal">
                {modalReject?.textInfo}
              </Typography>
            </Grid>
          )}
          {modalReject?.withUpload ? (
            <Grid align="center" item xs={12}>
              <FileUpload
                accept={['.pdf', '.jpg', '.jpeg', '.png']}
                control={control}
                helperText="Upload .jpg, .png or .pdf document, max 1 MB "
                maxSize={1050000}
                name="media"
                placeholder="Example: evidence.jpg"
              />
            </Grid>
          ) : (
            ''
          )}
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Reason"
              maxLength={modalReject?.maxLengthReason || 1500}
              minRows={3}
              multiline
              name="note"
              placeholder={
                modalReject?.placeholder || 'Please describe the note..'
              }
              required
            />
          </Grid>
          {modalReject?.caption && (
            <Grid item xs={12}>
              <Typography variant="caption" weight="normal">
                {modalReject?.caption}
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
                {modalReject?.submitText || 'SUBMIT'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

ReturnForm.defaultProps = {
  modalReject: null,
};

ReturnForm.propTypes = {
  modalReject: PropTypes.object,
};
