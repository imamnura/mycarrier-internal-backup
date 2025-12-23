import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import Typography from '@components/Typography';
import Button from '@components/Button';
import useStyles from '../../styles';
import { Select } from '@components/FormField';
import useAction from './hooks/useAction';

const FormPICProfile = (props) => {
  const { dialogRoot } = useStyles();
  const { control, onSubmit, labels, customerAsyncProps, handleSubmit } =
    useAction(props);

  const {
    formPic: { open, id = 'popup-form-pic' },
    onClose,
  } = props;

  return (
    <Dialog classes={{ paper: dialogRoot }} maxWidth="xs" open={open}>
      <DialogTitle>
        <Box sx={{ textAlign: 'center', paddingTop: 16, marginBottom: -16 }}>
          <Typography color="general-dark" inline variant="h5" weight="medium">
            {labels.title}
          </Typography>
          <Typography color="general-mid" variant="caption">
            {labels.description}
          </Typography>
        </Box>
      </DialogTitle>
      <Box minWidth={432} px={5} py={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              asyncProps={customerAsyncProps}
              control={control}
              isSearchable
              label="Name"
              menuWidth="100%"
              minWidth="100%"
              name="customer"
              placeholder="Choose Name"
              rawValue
              required
              id={id + '-name'}
            />
          </Grid>
        </Grid>
      </Box>

      <DialogActions>
        <Grid
          component={Box}
          container
          justifyContent="center"
          spacing={2}
          sx={{ width: '100%', padding: 24 }}
        >
          <Grid item>
            <Button onClick={onClose} variant="ghost" id={id + '-submit'}>
              Cancel
            </Button>
          </Grid>
          <Grid item id={id + '-submit'}>
            <Button onClick={handleSubmit(onSubmit)}>{labels.button}</Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

FormPICProfile.defaultProps = {
  allProfile: [],
};

FormPICProfile.propTypes = {
  allProfile: PropTypes.array,
  formPic: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['cdm', 'customer']).isRequired,
  updatePicProfile: PropTypes.func.isRequired,
};

export default FormPICProfile;
