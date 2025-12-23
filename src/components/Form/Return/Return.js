import Button from '@components/Button';
import { TextField, Select } from '@components/FormField';
import Typography from '@components/Typography';
import { Box, Dialog, Grid } from '@material-ui/core';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from './styles';
import PropTypes from 'prop-types';

const ReturnForm = (props) => {
  const {
    open,
    caption,
    description,
    onClose,
    title,
    labelForm,
    approver,
    labelApprover,
    labelPlaceholder,
  } = props;

  const classes = useStyles();

  const { control, onSubmit, isValid } = useAction(props);

  return (
    <Dialog classes={{ paper: classes.dialogRoot }} maxWidth="lg" open={open}>
      <Box sx={{ textAlign: 'center' }} mb={3}>
        <Typography
          color="general-dark"
          inline
          variant="h5"
          weight="medium"
          style={{ marginBottom: '24px' }}
        >
          {title}
        </Typography>
        {description && (
          <Typography color="general-mid" variant="caption">
            {description}
          </Typography>
        )}
      </Box>
      {approver.length > 0 && (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select
                options={approver}
                control={control}
                isSearchable
                label={labelApprover}
                menuWidth="100%"
                minWidth="100%"
                name="approver"
                placeholder="Select Approver"
                rawValue
                required
              />
            </Grid>
          </Grid>
        </Box>
      )}
      <Box mt={3}>
        <TextField
          control={control}
          label={labelForm}
          maxLength={160}
          minRows={4}
          multiline
          name="reason"
          required
          shouldUnregister
          placeholder={labelPlaceholder}
        />
      </Box>
      <Box mt={2}>
        <Typography color="general-mid" variant="caption">
          {caption}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <Button ml={16} onClick={onSubmit} disabled={!isValid}>
          Submit
        </Button>
      </Box>
    </Dialog>
  );
};

ReturnForm.defaultProps = {
  caption: '',
  description: '',
  labelForm: 'Please describe the note..',
  labelPlaceholder: 'Enter reason for return...',
  open: false,
  title: '',
  approver: [],
  labelApprover: 'Select Approver to Return Document',
};

ReturnForm.propTypes = {
  caption: PropTypes.string,
  description: PropTypes.string,
  labelForm: PropTypes.string,
  labelPlaceholder: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  title: PropTypes.string,
  approver: PropTypes.array,
  labelApprover: PropTypes.string,
};

export default ReturnForm;
