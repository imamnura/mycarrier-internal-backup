import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { Select, TextField, Checkbox } from '@components/FormField';
import useActions from './hooks/useActions';

export default function Component(props) {
  const { content } = props;

  const {
    control,
    formState: { isValid, isDirty },
    handleUpdateStatus,
    handleSubmit,
    onClose,
    createNewPort,
    node,
    loading,
    options,
  } = useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={content?.open}>
      <form onSubmit={handleSubmit(handleUpdateStatus)}>
        <Grid container style={{ padding: '12px 24px' }}>
          {content?.title && (
            <Grid align="center" item xs={12}>
              <Typography color="general-dark" variant="h5" weight="medium">
                {content?.title}
              </Typography>
            </Grid>
          )}
          {content?.textInfo && (
            <Grid align="center" item xs={12}>
              <Typography color="general-mid" variant="caption" weight="normal">
                {content?.textInfo}
              </Typography>
            </Grid>
          )}
          <Grid item style={{ paddingTop: '16px' }} xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  control={control}
                  label="Request Name"
                  maxLength={60}
                  name="requestName"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  control={control}
                  isLoading={loading.node}
                  isSearchable
                  label="Node"
                  menuWidth="100%"
                  minWidth="100%"
                  name="node"
                  options={options.node}
                  placeholder="Choose Node"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  control={control}
                  isDisabled={!!createNewPort || !node}
                  isLoading={loading.port}
                  isSearchable
                  label="Port"
                  menuWidth="100%"
                  minWidth="100%"
                  name="port"
                  options={options.port}
                  placeholder="Choose Port"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                  <Checkbox
                    control={control}
                    disabled={!node}
                    name="createNewPort"
                  />
                  <Typography color="general-mid" variant="body2">
                    Create new port
                  </Typography>
                </Box>
              </Grid>
              {!!createNewPort && (
                <Grid item xs={12}>
                  <TextField
                    control={control}
                    label="New Port"
                    maxLength={20}
                    name="newPort"
                    required
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  control={control}
                  label="IP CE"
                  maxLength={40}
                  name="ipCe"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  control={control}
                  label="Please describe the note.."
                  maxLength={1000}
                  minRows={3}
                  multiline
                  name="noteProgress"
                  required
                />
              </Grid>
            </Grid>
          </Grid>
          {content?.caption && (
            <Grid item xs={12}>
              <Typography color="general-mid" variant="caption" weight="normal">
                {content?.caption}
              </Typography>
            </Grid>
          )}
          <Grid
            container
            item
            justifyContent="center"
            pt={2}
            spacing={2}
            style={{ paddingTop: '20px' }}
          >
            <Grid item>
              <Button onClick={onClose} variant="ghost">
                CANCEL
              </Button>
            </Grid>
            <Grid item>
              <Button disabled={!isValid || !isDirty} type="submit">
                {content?.submitText || 'SUBMIT'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

Component.defaultProps = {
  content: null,
};

Component.propTypes = {
  content: PropTypes.object,
};
