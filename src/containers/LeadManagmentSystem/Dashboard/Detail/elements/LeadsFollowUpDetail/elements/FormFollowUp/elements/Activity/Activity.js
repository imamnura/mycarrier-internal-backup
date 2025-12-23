import Button from '@components/Button';
import { DateTimePicker, Select, TextField } from '@components/FormField';
import Typography from '@components/Typography';
import { Box, Dialog, Grid } from '@material-ui/core';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from '../../styles';
import PropTypes from 'prop-types';
import { pickOptionStatus, pickOptionType } from '../../utils';

const Activity = (props) => {
  const { onClose, variant, status } = props;
  const classes = useStyles();

  const { control, onSubmit, handleSubmit } = useAction(props);

  const title = {
    add: 'Add New Activity',
    edit: 'Edit Activity',
  }[variant];

  const submitLabel = {
    add: 'Add Activity',
    edit: 'Edit Activity',
  }[variant];

  return (
    <Dialog
      classes={{ paper: classes.dialogRoot }}
      maxWidth="lg"
      open
      scroll="body"
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography color="general-dark" inline variant="h5" weight="medium">
          {title}
        </Typography>
      </Box>
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              control={control}
              isSearchable
              label="Type"
              name="type"
              options={pickOptionType(status)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Description"
              maxLength={160}
              minRows={4}
              multiline
              name="description"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <DateTimePicker control={control} label="Date" name="due_date" />
          </Grid>
          <Grid item xs={12}>
            <Select
              control={control}
              isSearchable
              label="Status"
              menuPosition="fixed"
              name="status"
              options={pickOptionStatus(status)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              control={control}
              label="Priority"
              menuPosition="fixed"
              name="priority"
              options={[
                { label: '1-ASAP', value: '1-ASAP' },
                { label: '2-High', value: '2-High' },
                { label: '3-Medium', value: '3-Medium' },
                { label: '4-Low', value: '4-Low' },
              ]}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              control={control}
              label="Duration"
              menuPosition="fixed"
              name="duration"
              options={[
                { label: '15', value: '15' },
                { label: '30', value: '30' },
                { label: '45', value: '45' },
                { label: '60', value: '60' },
                { label: '90', value: '90' },
                { label: '120', value: '120' },
              ]}
              required
            />
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <Button ml={16} onClick={handleSubmit(onSubmit)}>
          {submitLabel}
        </Button>
      </Box>
    </Dialog>
  );
};

Activity.defaultProps = {
  variant: 'add',
};

Activity.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['add', 'edit']),
};

export default Activity;
