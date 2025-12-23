import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { TextField, FileUpload } from '@components/FormField';
import useActions from './hooks/useActions';

export default function Component(props) {
  const { modalReturn } = props;

  const {
    control,
    formState: { isValid, isDirty },
    handleUpdateStatus,
    handleSubmit,
    onClose,
  } = useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalReturn}>
      <form onSubmit={handleSubmit(handleUpdateStatus)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          {modalReturn?.title && (
            <Grid align="center" item xs={12}>
              <Typography variant="h5" weight="medium">
                {modalReturn?.title}
              </Typography>
            </Grid>
          )}
          {modalReturn?.textInfo && (
            <Grid align="center" item xs={12}>
              <Typography variant="caption" weight="normal">
                {modalReturn?.textInfo}
              </Typography>
            </Grid>
          )}
          <Grid align="center" item xs={12}>
            <FileUpload
              accept={['.pdf']}
              control={control}
              helperText="Upload .pdf document here, max 500 KB "
              maxSize={524288}
              name="media"
              placeholder="Example: baso-rev.pdf"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Note"
              maxLength={160}
              minRows={3}
              multiline
              name="note"
              placeholder={
                modalReturn?.placeholder || 'Please describe the note..'
              }
              required
            />
          </Grid>
          {modalReturn?.caption && (
            <Grid item xs={12}>
              <Typography variant="caption" weight="normal">
                {modalReturn?.caption}
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
                {modalReturn?.submitText || 'SUBMIT'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

Component.defaultProps = {
  modalReturn: null,
};

Component.propTypes = {
  modalReturn: PropTypes.object,
};
