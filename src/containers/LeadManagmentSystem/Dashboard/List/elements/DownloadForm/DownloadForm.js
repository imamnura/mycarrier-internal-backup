import Button from '@components/Button';
import { TextField } from '@components/FormField';
import Typography from '@components/Typography';
import { Box, Dialog } from '@material-ui/core';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from './styles';
import PropTypes from 'prop-types';

const DownloadForm = (props) => {
  const { open, onClose } = props;

  const classes = useStyles();

  const { control, onSubmit } = useAction(props);

  return (
    <Dialog classes={{ paper: classes.dialogRoot }} maxWidth="lg" open={open}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography color="general-dark" inline variant="h5" weight="medium">
          Type Your Email
        </Typography>
        <Box mt={1}>
          <Typography color="general-mid" variant="caption">
            Before you download the data, please provide your email below
          </Typography>
        </Box>
      </Box>
      <Box mt={4}>
        <TextField
          control={control}
          label="Email"
          maxLength={40}
          name="email"
          required
          shouldUnregister
        />
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

DownloadForm.defaultProps = {
  caption: '',
  description: '',
  labelForm: 'Please describe the note..',
  open: false,
  title: '',
};

DownloadForm.propTypes = {
  caption: PropTypes.string,
  description: PropTypes.string,
  labelForm: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  title: PropTypes.string,
};

export default DownloadForm;
