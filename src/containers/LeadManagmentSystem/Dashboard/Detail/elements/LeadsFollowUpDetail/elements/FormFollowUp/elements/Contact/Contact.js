import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import Button from '@components/Button';
import useAction from './hooks/useAction';
import useStyles from '../../styles';
import { Box, Dialog, Grid } from '@material-ui/core';
import { TextField } from '@components/FormField';

const Contact = (props) => {
  const { onClose, variant } = props;
  const classes = useStyles();

  const { control, onSubmit, handleSubmit } = useAction(props);

  const title = {
    add: 'Add New Contact',
    edit: 'Edit Contact',
  }[variant];

  const submitLabel = {
    add: 'Add Contact',
    edit: 'Edit Contact',
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
            <TextField
              control={control}
              label="Contact Name"
              maxLength={40}
              multiline
              name="contactName"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="First Name"
              maxLength={20}
              multiline
              name="firstName"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Last Name"
              maxLength={20}
              multiline
              name="lastName"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Email"
              maxLength={40}
              multiline
              name="email"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Work Phone"
              maxLength={16}
              name="workPhone"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Mobile Phone"
              maxLength={16}
              name="mobilePhone"
              required
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              control={control}
              label="Twitter"
              maxLength={40}
              multiline
              name="twitter"
            />
          </Grid> */}
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

Contact.defaultProps = {
  variant: 'add',
};

Contact.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['add', 'edit']),
};

export default Contact;
