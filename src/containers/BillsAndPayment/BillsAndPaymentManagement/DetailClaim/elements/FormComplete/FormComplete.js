import Button from '@components/Button';
import { FileUpload, TextField } from '@components/FormField';
import Typography from '@components/Typography';
import { Box, Dialog } from '@material-ui/core';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from './styles';
import PropTypes from 'prop-types';
import { postUploadClaimEvidence } from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';

const FormComplete = (props) => {
  const { open, onClose } = props;

  const classes = useStyles();

  const { control, onSubmit, claimId } = useAction(props);

  return (
    <Dialog classes={{ paper: classes.dialogRoot }} maxWidth="lg" open={open}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography color="general-dark" inline variant="h5" weight="medium">
          Please filled the data
          <br />
          to be sent to customer
        </Typography>
        <Typography color="general-mid" variant="caption">
          Once you send this data, it will be readed by customer
        </Typography>
      </Box>
      <Box mt={4}>
        <FileUpload
          accept={['.jpg', '.png', '.pdf']}
          control={control}
          fetcher={postUploadClaimEvidence(claimId)}
          helperText="Upload .jpg, .png or .pdf document, max 1 MB"
          maxSize={1048576}
          name="evidence"
          placeholder="Example: evidence.jpg"
          shouldUnregister
        />
      </Box>
      <Box mt={2}>
        <TextField
          control={control}
          label="Note"
          maxLength={1000}
          minRows={4}
          multiline
          name="note"
          required
          shouldUnregister
        />
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <Button ml={16} onClick={onSubmit}>
          Save
        </Button>
      </Box>
    </Dialog>
  );
};

FormComplete.defaultProps = {
  open: false,
};

FormComplete.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export default FormComplete;
