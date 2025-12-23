import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Button from '@__old/components/elements/Button';
import Dialog from '@__old/components/elements/Dialog';
import Text from '@__old/components/elements/Text';
import useActions from './hooks/useActions';
import { TextField } from '@components/FormField';

export default function Component(props) {
  const { modalUpdateStatus } = props;
  const { title, caption, placeholder } = modalUpdateStatus;

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
          <Grid align="center" item xs={12}>
            <Text variant="body1">{title}</Text>
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              helperText={placeholder}
              label="Note"
              maxLength={160}
              minRows={3}
              multiline
              name="note"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Text variant="caption">{caption}</Text>
          </Grid>
          <Grid align="center" item xs={12}>
            <Button children="CANCEL" onClick={onClose} variant="secondary" />
            &nbsp;&nbsp;&nbsp;
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
  modalUpdateStatus: false,
};

Component.propTypes = {
  modalUpdateStatus: PropTypes.bool,
};
