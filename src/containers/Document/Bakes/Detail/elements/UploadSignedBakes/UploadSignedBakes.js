import Button from '@components/Button';
import { FileUpload } from '@components/FormField';
import Typography from '@components/Typography';
import { Box, Dialog } from '@material-ui/core';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from './styles';
import PropTypes from 'prop-types';

const UploadSignedBakes = (props) => {
  const { open, onClose } = props;

  const classes = useStyles();

  const { control, onSubmit, handleSubmit } = useAction(props);

  return (
    <Dialog classes={{ paper: classes.dialogRoot }} maxWidth="lg" open={open}>
      <Box sx={{ textAlign: 'center', px: 4 }}>
        <Typography color="general-dark" inline variant="h5" weight="medium">
          Please upload the document to be submitted
        </Typography>
        <Box mt={1}>
          <Typography color="general-mid" variant="caption">
            Once you send this data, it will be submitted
          </Typography>
        </Box>
      </Box>
      <Box mt={3}>
        <FileUpload
          accept={['.pdf']}
          control={control}
          helperText="Upload .pdf document here, max 500 KB "
          maxSize={512000}
          name="file"
          placeholder="Example: bakes.pdf"
          shouldUnregister
        />
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <Button ml={16} onClick={handleSubmit(onSubmit)}>
          Send
        </Button>
      </Box>
    </Dialog>
  );
};

UploadSignedBakes.defaultProps = {
  open: false,
};

UploadSignedBakes.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export default UploadSignedBakes;
