import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { TextField } from '@components/FormField';
import Dialog from '@__old/components/elements/Dialog';
import Typography from '@components/Typography';
import Button from '@components/Button';
import useActions from './hooks/useActions';

export default function Component(props) {
  const { modalDownload } = props;

  const {
    control,
    formState: { isValid, isDirty },
    handleDownload,
    handleSubmit,
    onClose,
  } = useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalDownload}>
      <form onSubmit={handleSubmit(handleDownload)}>
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          <Grid align="center" item xs={12}>
            <Typography
              children="Type Your Email"
              variant="h5"
              weight="medium"
            />
          </Grid>
          <Grid
            align="center"
            item
            style={{ margin: 'auto', maxWidth: '60%', paddingTop: '0' }}
            xs={12}
          >
            <Typography
              children="Before you download the data, please provide your email below"
              color="general-mid"
              variant="caption"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Email"
              maxLength={40}
              minRows={1}
              multiline
              name="email"
              required
            />
          </Grid>
          <Grid
            align="center"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 10,
              width: '100%',
            }}
          >
            <Button children="CANCEL" onClick={onClose} variant="ghost" />
            &nbsp;&nbsp;
            <Button
              children="SUBMIT"
              disabled={!isValid || !isDirty}
              type="submit"
            />
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

Component.defaultProps = {
  modalDownload: false,
};

Component.propTypes = {
  modalDownload: PropTypes.bool,
};
