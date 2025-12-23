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
import useStyles from './styles';
import { Select } from '@components/FormField';
import useActions from './hooks/useActions';

const PriorityForm = (props) => {
  const { dialogRoot } = useStyles();
  const {
    modalPriorityForm,
    onClose,
    handleSubmit,
    onSubmit,
    control,
    formState: { isValid, isDirty },
    loadingOptions,
    levelOptions,
  } = useActions(props);

  return (
    <Dialog
      classes={{ paper: dialogRoot }}
      maxWidth="xs"
      open={modalPriorityForm}
    >
      <DialogTitle>
        <Box sx={{ textAlign: 'center', paddingTop: 16, marginBottom: -16 }}>
          <Typography color="general-dark" inline variant="h5" weight="medium">
            {modalPriorityForm?.title}
          </Typography>
        </Box>
      </DialogTitle>
      <Box minWidth={432} px={5} py={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              control={control}
              isLoading={loadingOptions}
              label="Priority Level"
              menuWidth="100%"
              minWidth="100%"
              name="level"
              options={levelOptions}
              placeholder="Select Priority Level"
              required
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
          sx={{ width: '100%', paddingBottom: 24 }}
        >
          <Grid item>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={!isValid || !isDirty}
              onClick={handleSubmit(onSubmit)}
              type="submit"
            >
              {modalPriorityForm?.button || 'NEXT'}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

PriorityForm.defaultProps = {
  modalPriority: {},
};

PriorityForm.propTypes = {
  modalPriority: PropTypes.object,
};

export default PriorityForm;
