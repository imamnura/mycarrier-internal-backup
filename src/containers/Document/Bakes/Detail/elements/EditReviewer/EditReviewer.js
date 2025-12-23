import Button from '@components/Button';
import { TextField } from '@components/FormField';
import Typography from '@components/Typography';
import { Box, Dialog, Grid } from '@material-ui/core';
import React, { Fragment } from 'react';
import useAction from './hooks/useAction';
import useStyles from './styles';
import PropTypes from 'prop-types';
import ButtonMinimal from '@components/ButtonMinimal';

const EditReviewer = (props) => {
  const { open, onClose } = props;

  const classes = useStyles();

  const { control, onSubmit, handleSubmit, telkomApproval, customerApproval } =
    useAction(props);

  return (
    <Dialog
      classes={{ paper: classes.dialogRoot }}
      maxWidth="lg"
      open={open}
      scroll="body"
    >
      <Box sx={{ textAlign: 'center', px: 4 }}>
        <Typography color="general-dark" inline variant="h5" weight="medium">
          You can update reviewer here
        </Typography>
        <Box mt={1}>
          <Typography color="general-mid" variant="caption">
            Once the reviewer has been approved, it can’t be updated
          </Typography>
        </Box>
      </Box>
      <Box mt={3}>
        <Box pb={4} pt={5}>
          <Typography color="general-mid" variant="h4" weight="medium">
            Telkom Approval
          </Typography>
        </Box>
        {telkomApproval.fields.map((field, index) => {
          const isDisabled =
            telkomApproval.allApproved || index <= telkomApproval.active;

          return (
            <Fragment key={field.id}>
              {telkomApproval.fields.length > 2 && (
                <Box mt={4}>
                  {!isDisabled && (
                    <Grid alignItems="center" container>
                      <Grid item xs={10}>
                        <div className={classes.dashed} />
                      </Grid>
                      <Grid item xs={2}>
                        <ButtonMinimal
                          label="delete reviewer"
                          onClick={telkomApproval.onDelete(index)}
                          variant="delete"
                        />
                      </Grid>
                    </Grid>
                  )}
                </Box>
              )}

              <Grid container spacing={2}>
                <Grid item lg={2} xs={12}>
                  <Box mt={2}>
                    <Typography color="general-mid" variant="body1">
                      Telkom Reviewer {index + 1}
                    </Typography>
                    {index > telkomApproval.fields.length - 3 && (
                      <Typography color="general-mid" inline variant="body1">
                        (
                        {index === telkomApproval.fields.length - 1
                          ? 'menyetujui'
                          : 'mengetahui'}
                        )
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item lg={2} sm={3} xs={12}>
                  <TextField
                    control={control}
                    disabled={isDisabled}
                    label="Name"
                    maxLength={60}
                    name={`telkomApproval.${index}.name`}
                    required
                    shouldUnregister
                  />
                </Grid>
                <Grid item lg={2} sm={3} xs={12}>
                  <TextField
                    control={control}
                    disabled={isDisabled}
                    label="Phone Number"
                    maxLength={60}
                    name={`telkomApproval.${index}.phoneNumber`}
                    required
                    shouldUnregister
                  />
                </Grid>
                <Grid item lg={2} sm={3} xs={12}>
                  <TextField
                    control={control}
                    disabled={isDisabled}
                    label="Title"
                    maxLength={60}
                    name={`telkomApproval.${index}.position`}
                    required
                    shouldUnregister
                  />
                </Grid>
                <Grid item lg={2} sm={3} xs={12}>
                  <TextField
                    control={control}
                    disabled={isDisabled}
                    label="Email"
                    maxLength={60}
                    name={`telkomApproval.${index}.email`}
                    required
                    shouldUnregister
                  />
                </Grid>
              </Grid>
            </Fragment>
          );
        })}
        {telkomApproval.fields.length < 5 && !telkomApproval.allApproved && (
          <Box mt={4}>
            <Grid alignItems="center" container>
              <Grid item xs={10}>
                <div className={classes.dashed} />
              </Grid>
              <Grid item xs={2}>
                <ButtonMinimal
                  label="add reviewer"
                  onClick={telkomApproval.onAdd}
                  variant="add"
                />
              </Grid>
            </Grid>
          </Box>
        )}
        <Box pb={4} pt={5}>
          <Typography color="general-mid" variant="h4" weight="medium">
            Customer Approval
          </Typography>
        </Box>
        {customerApproval.fields.map((field, index) => {
          const isDisabled =
            customerApproval.allApproved || index <= customerApproval.active;

          return (
            <Fragment key={field.id}>
              {customerApproval.fields.length > 1 && (
                <Box mt={4}>
                  {!isDisabled && (
                    <Grid alignItems="center" container>
                      <Grid item xs={10}>
                        <div className={classes.dashed} />
                      </Grid>
                      <Grid item xs={2}>
                        <ButtonMinimal
                          label="delete reviewer"
                          onClick={customerApproval.onDelete(index)}
                          variant="delete"
                        />
                      </Grid>
                    </Grid>
                  )}
                </Box>
              )}

              <Grid container spacing={2}>
                <Grid item lg={2} xs={12}>
                  <Box mt={2}>
                    <Typography color="general-mid" variant="body1">
                      Telkom Reviewer {index + 1}
                    </Typography>
                    {index > customerApproval.fields.length - 3 && (
                      <Typography color="general-mid" inline variant="body1">
                        (
                        {index === customerApproval.fields.length - 1
                          ? 'menyetujui'
                          : 'mengetahui'}
                        )
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item lg={2} sm={3} xs={12}>
                  <TextField
                    control={control}
                    disabled={isDisabled}
                    label="Name"
                    maxLength={60}
                    name={`customerApproval.${index}.name`}
                    required
                    shouldUnregister
                  />
                </Grid>
                <Grid item lg={2} sm={3} xs={12}>
                  <TextField
                    control={control}
                    disabled={isDisabled}
                    label="Phone Number"
                    maxLength={60}
                    name={`customerApproval.${index}.phoneNumber`}
                    required
                    shouldUnregister
                  />
                </Grid>
                <Grid item lg={2} sm={3} xs={12}>
                  <TextField
                    control={control}
                    disabled={isDisabled}
                    label="Title"
                    maxLength={60}
                    name={`customerApproval.${index}.position`}
                    required
                    shouldUnregister
                  />
                </Grid>
                <Grid item lg={2} sm={3} xs={12}>
                  <TextField
                    control={control}
                    disabled={isDisabled}
                    label="Email"
                    maxLength={60}
                    name={`customerApproval.${index}.email`}
                    required
                    shouldUnregister
                  />
                </Grid>
              </Grid>
            </Fragment>
          );
        })}
        {customerApproval.fields.length < 5 &&
          !customerApproval.allApproved && (
            <Box mt={4}>
              <Grid alignItems="center" container>
                <Grid item xs={10}>
                  <div className={classes.dashed} />
                </Grid>
                <Grid item xs={2}>
                  <ButtonMinimal
                    label="add reviewer"
                    onClick={customerApproval.onAdd}
                    variant="add"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
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

EditReviewer.defaultProps = {
  open: false,
};

EditReviewer.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export default EditReviewer;
