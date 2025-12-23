import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import { TextField } from '@components/FormField';
import Typography from '@components/Typography';
import useActions from './hooks/useActions';
import useStyles from './styles';

export default function Component(props) {
  const { step, modalStatus, caption, title } = props;

  const {
    control,
    formState,
    handleSubmit,
    confirmationStatus,
    confirmationProgress,
    onClose,
  } = useActions(props);

  const classes = useStyles();

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalStatus.open}>
      <form
        onSubmit={handleSubmit(
          step === 'updateProgress' ? confirmationProgress : confirmationStatus,
        )}
      >
        <Grid container spacing={2} style={{ padding: '16px 24px' }}>
          <Grid align="center" item xs={12}>
            <Typography
              children={`Please give note of ${title}`}
              variant="body1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Note"
              maxLength={160}
              minRows={4}
              multiline
              name="note"
              placeholder="Please describe the reason.."
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              children={`Once you ${caption},
              it will be process and data will be sent to customer automatically`}
              variant="caption"
            />
          </Grid>
          <Grid align="center" className={classes.boxButton}>
            <Button children={'CANCEL'} onClick={onClose} variant="ghost" />
            &nbsp;&nbsp;
            <Button
              children={'SUBMIT'}
              disabled={!formState.isValid || !formState.isDirty}
              type="submit"
            />
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

Component.defaultProps = {
  caption: 'updated the status',
  detail: {},
  modalStatus: {
    open: false,
  },
  setModalStatus: () => {},
  step: 'updateStatus',
  title: 'update status',
};

Component.propTypes = {
  caption: PropTypes.string,
  detail: PropTypes.object,
  modalStatus: PropTypes.object,
  setModalStatus: PropTypes.func,
  step: PropTypes.string,
  title: PropTypes.string,
};
