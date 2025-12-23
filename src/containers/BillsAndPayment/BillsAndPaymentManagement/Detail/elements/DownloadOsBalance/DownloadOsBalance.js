import Button from '@components/Button';
import DateRangePicker from '@components/DateRangePicker';
import Typography from '@components/Typography';
import { Box, Dialog, Grid } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import React from 'react';
import { Controller } from 'react-hook-form';
import useAction from './hooks/useAction';
import useStyles from './styles';
import { LOCATOR } from '../../test-locator';

const testLocator =
  LOCATOR.sections.customerInformation.osBalance.download.popup;

const DownloadOsBalance = (props) => {
  const { control, onClose, onSubmit, open, handleSubmit, isValid } = useAction(
    { ...props, testLocator },
  );

  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: classes.dialogRoot }}
      maxWidth="lg"
      open={open}
      onClose={onClose}
    >
      <Box sx={{ width: 320 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            width: 310,
            position: 'relative',
          }}
        >
          <Typography variant="h5" weight="medium">
            Download O/S Balance
          </Typography>
          <CloseIcon
            className={classes.closeIcon}
            onClick={onClose}
            id={testLocator.close}
          />
        </Box>
      </Box>
      <Box mt={3} width="100%">
        <Grid container justifyContent="flex-start" spacing={2}>
          <Grid item xs={12}>
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
                        children="Period Range"
                        color="general-mid"
                        variant="overline"
                        weight="medium"
                      />
                    </Box>
                    <DateRangePicker
                      format="MMMM YYYY"
                      label="Select Periode Range"
                      onChange={(e) => onChange(e)}
                      value={value}
                      views={['year', 'month']}
                      useRangeMonth
                      openTo={'month'}
                      fullWidth
                      id={testLocator.period}
                    />
                    <Typography
                      children={error}
                      color="primary-main"
                      variant="caption"
                    />
                  </>
                );
              }}
            ></Controller>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 4,
          gap: '12px',
          width: '100%',
        }}
      >
        <Button onClick={onClose} variant="ghost" id={testLocator.cancel}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
          id={testLocator.download}
        >
          Download
        </Button>
      </Box>
    </Dialog>
  );
};

export default DownloadOsBalance;
