import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { TextField } from '@components/FormField';
import useActions from './hooks/useActions';

export default function Component(props) {
  const { modalAddLoginData } = props;

  const {
    control,
    formState: { isValid, isDirty },
    handleUpdateStatus,
    handleSubmit,
    onClose,
  } = useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalAddLoginData}>
      <form onSubmit={handleSubmit(handleUpdateStatus)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          {modalAddLoginData?.title && (
            <Grid align="center" item xs={12}>
              <Typography variant="h5" weight="medium">
                {modalAddLoginData?.title}
              </Typography>
            </Grid>
          )}
          {modalAddLoginData?.textInfo && (
            <Grid align="center" item xs={12}>
              <Typography variant="caption" weight="normal">
                {modalAddLoginData?.textInfo}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Username"
              maxLength={40}
              name="username"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Password"
              maxLength={40}
              name="password"
              required
            />
          </Grid>
          {modalAddLoginData?.caption && (
            <Grid item xs={12}>
              <Typography variant="caption" weight="normal">
                {modalAddLoginData?.caption}
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
                {modalAddLoginData?.submitText || 'SUBMIT'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

Component.defaultProps = {
  modalAddLoginData: null,
};

Component.propTypes = {
  modalAddLoginData: PropTypes.object,
};
