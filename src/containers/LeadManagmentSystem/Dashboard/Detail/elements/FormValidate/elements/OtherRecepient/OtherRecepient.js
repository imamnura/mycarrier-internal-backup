import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import { Box, Grid } from '@material-ui/core';
import Stepper from '@components/Stepper';
import useAction from './hooks/useAction';
import Button from '@components/Button';
import useStyles from '../../styles';
import { TextField } from '@components/FormField';

const OtherRecepient = (props) => {
  const { onClose } = props;
  const { control, onSubmit, onPrevious, disabled, handleSubmit } =
    useAction(props);

  const classes = useStyles();

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <Typography color="general-dark" inline variant="h5" weight="medium">
          Please assign this lead
        </Typography>
        <Typography color="general-mid" variant="caption">
          {' '}
          Then, type Sales Team’s name or NIK that you want to assign{' '}
        </Typography>
      </Box>
      <Box my={3}>
        <Stepper
          active={2}
          steps={['Company Validation', 'Choose Option', 'Fill Option Data']}
          variant="number"
        />
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Full Name"
              maxLength={40}
              name="fullName"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="Email"
              maxLength={50}
              name="email"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="WhatsApp Number"
              maxLength={20}
              name="phoneNumber"
              required
            />
          </Grid>
        </Grid>
      </Box>
      <Grid
        component={Box}
        container
        justifyContent="center"
        spacing={2}
        sx={{ width: '100%', padding: 16, pt: 4 }}
      >
        <Grid item>
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
        </Grid>
        <div className={classes.actionDivider} />
        <Grid item>
          <Button onClick={onPrevious} variant="ghost">
            Previous
          </Button>
        </Grid>
        <Grid item>
          <Button disabled={disabled} onClick={handleSubmit(onSubmit)}>
            {' '}
            Assign{' '}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

OtherRecepient.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default OtherRecepient;
