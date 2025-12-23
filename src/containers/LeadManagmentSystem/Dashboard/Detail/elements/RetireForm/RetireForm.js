import Button from '@components/Button';
import { Select, TextField } from '@components/FormField';
import Typography from '@components/Typography';
import { Box, Dialog } from '@material-ui/core';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from './styles';
import PropTypes from 'prop-types';

const RetireForm = (props) => {
  const { open, onClose } = props;

  const classes = useStyles();

  const { control, onSubmit } = useAction(props);

  return (
    <Dialog classes={{ paper: classes.dialogRoot }} maxWidth="lg" open={open}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography color="general-dark" inline variant="h5" weight="medium">
          Please give note of retired
        </Typography>
      </Box>
      <Box mt={4}>
        <Select
          control={control}
          isSearchable
          label="Retired Reason"
          menuPosition="fixed"
          name="reason"
          options={[
            { label: 'Competitor selected', value: 'Competitor selected' },
            { label: 'Do NOT contact', value: 'Do NOT contact' },
            { label: 'Duplicate lead', value: 'Duplicate lead' },
            {
              label: 'Failed to reach contact',
              value: 'Failed to reach contact',
            },
            { label: 'Incorrect data', value: 'Incorrect data' },
            { label: 'Insufficient funds', value: 'Insufficient funds' },
            { label: 'Is a partner', value: 'Is a partner' },
            { label: 'Left company', value: 'Left company' },
            { label: 'No product list', value: 'No product list' },
            { label: 'Nurture in marketing', value: 'Nurture in marketing' },
            { label: 'Opportunity Created', value: 'Opportunity Created' },
            {
              label: 'Opportunity in progress',
              value: 'Opportunity in progress',
            },
          ]}
          required
        />
        <TextField
          control={control}
          label="Note"
          maxLength={160}
          minRows={4}
          multiline
          name="note"
          required
          shouldUnregister
        />
      </Box>
      <Box mt={2}>
        <Typography color="general-mid" variant="caption">
          Once you returned this, it will be process and data will be sent to
          customer automatically.
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <Button ml={16} onClick={onSubmit}>
          Submit
        </Button>
      </Box>
    </Dialog>
  );
};

RetireForm.defaultProps = {
  open: false,
};

RetireForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export default RetireForm;
