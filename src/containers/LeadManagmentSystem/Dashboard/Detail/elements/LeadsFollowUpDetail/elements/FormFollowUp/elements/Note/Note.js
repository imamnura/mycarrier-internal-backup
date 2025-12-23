import Button from '@components/Button';
import { Select, TextField } from '@components/FormField';
import Typography from '@components/Typography';
import { Box, Dialog, Grid } from '@material-ui/core';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from '../../styles';
import PropTypes from 'prop-types';

const Note = (props) => {
  const { onClose, variant } = props;
  const classes = useStyles();

  const { control, onSubmit, handleSubmit } = useAction(props);

  const title = {
    add: 'Add New Note',
    edit: 'Edit Note',
  }[variant];

  const submitLabel = {
    add: 'Add Note',
    edit: 'Edit Note',
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
              options={[
                // { label: 'Directions', value: 'Directions' }, // failed to sc
                { label: 'Safety', value: 'Safety' },
                { label: 'Special', value: 'Special' },
                { label: 'Reference', value: 'Reference' },
                { label: 'eAdvisor', value: 'eAdvisor' },
                { label: 'Legal', value: 'Legal' },
                { label: 'Exclusion', value: 'Exclusion' },
                {
                  label: 'Pre-existing Condition',
                  value: 'Pre-existing Condition',
                },
                { label: 'Permanent', value: 'Permanent' },
                { label: 'System', value: 'System' },
                { label: 'Temporary', value: 'Temporary' },
                { label: 'Note', value: 'Note' },
                {
                  label: 'Business Description',
                  value: 'Business Description',
                },
                { label: 'Regional Plans', value: 'Regional Plans' },
                { label: 'Contracts Process', value: 'Contracts Process' },
              ]}
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

Note.defaultProps = {
  variant: 'add',
};

Note.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['add', 'edit']),
};

export default Note;
