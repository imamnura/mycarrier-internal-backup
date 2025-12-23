import Button from '@components/Button';
import DatePicker from '@components/DatePicker';
import Typography from '@components/Typography';
import { Box, Dialog, Grid } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import useAction from './hooks/useAction';
import useStyles from './styles';
import { RadioGroup } from '@components/FormField';

const UpdatePeriod = (props) => {
  const { control, onClose, onSubmit, open, handleSubmit } = useAction(props);

  const classes = useStyles();

  return (
    <Dialog classes={{ paper: classes.dialogRoot }} maxWidth="lg" open={open}>
      <Box sx={{ width: 320 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            textAlign: 'center',
            width: 310,
          }}
        >
          <Typography variant="h5" weight="medium">
            Update period
          </Typography>
          <Typography color="general-mid" variant="caption">
            Choose period that you want to update your data
          </Typography>
        </Box>
      </Box>
      <Box mt={3} width="100%">
        <Grid container justifyContent="flex-start" spacing={2}>
          <Grid item xs={12}>
            <RadioGroup
              control={control}
              direction="horizontal"
              label="Updaate by"
              name="update"
              options={[
                { label: 'Invoice Date', value: 'invoiceDate' },
                { label: 'Clearing Date', value: 'clearingDate' },
              ]}
              hideHelper
            />
            <Controller
              control={control}
              name="period"
              render={({ field, fieldState }) => {
                const { value, onChange } = field;

                const error = fieldState?.error?.message;

                return (
                  <>
                    <Typography
                      children="*"
                      color="primary-main"
                      variant="overline"
                      weight="medium"
                    />
                    <Box component="span" sx={{ marginLeft: 2 }}>
                      <Typography
                        children="Period"
                        color="general-mid"
                        variant="overline"
                        weight="medium"
                      />
                    </Box>
                    <DatePicker
                      autoOk
                      format="MMMM YYYY"
                      label="Choose Period"
                      onChange={onChange}
                      openTo={'month'}
                      value={value}
                      views={['year', 'month']}
                    />
                    <Typography
                      children={error}
                      color="primary-main"
                      variant="caption"
                    />
                  </>
                );
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <div className={classes.actionDivider} />
        <Button onClick={handleSubmit(onSubmit)}>Update</Button>
      </Box>
    </Dialog>
  );
};

export default UpdatePeriod;
