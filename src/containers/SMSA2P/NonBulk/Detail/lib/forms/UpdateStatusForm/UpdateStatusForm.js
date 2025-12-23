import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { TextField } from '@components/FormField';
import useActions from './hooks/useActions';

export default function Component(props) {
  const { modalUpdateStatus } = props;

  const {
    control,
    formState: { isValid, isDirty },
    handleUpdateStatus,
    handleSubmit,
    onClose,
  } = useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalUpdateStatus}>
      <form onSubmit={handleSubmit(handleUpdateStatus)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          {modalUpdateStatus?.title && (
            <Grid align="center" item xs={12}>
              <Typography variant="h5" weight="medium">
                {modalUpdateStatus?.title}
              </Typography>
            </Grid>
          )}
          {modalUpdateStatus?.textInfo && (
            <Grid align="center" item xs={12}>
              <Typography variant="caption" weight="normal">
                {modalUpdateStatus?.textInfo}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Note"
              maxLength={3000}
              minRows={3}
              multiline
              name="note"
              placeholder={
                modalUpdateStatus?.placeholder || 'Please describe the note..'
              }
              required
            />
          </Grid>
          {modalUpdateStatus?.caption && (
            <Grid item xs={12}>
              <Typography variant="caption" weight="normal">
                {modalUpdateStatus?.caption}
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
                {modalUpdateStatus?.submitText || 'SUBMIT'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

Component.defaultProps = {
  modalUpdateStatus: null,
};

Component.propTypes = {
  modalUpdateStatus: PropTypes.object,
};
